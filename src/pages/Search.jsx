import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import StatTerms from "../data/StatTerm";
import { teams } from "../data/Team.js";
import { BalldontlieAPI } from "@balldontlie/sdk";

const API_KEY = import.meta.env.VITE_API_KEY;
const api = new BalldontlieAPI({ apiKey: API_KEY });

const Search = () => {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [statTermResults, setStatTermResults] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 최초 선수 목록 로딩
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.nba.getPlayers({ page: 1, per_page: 100 });
        setPlayers(response.data);
      } catch (err) {
        setError("선수 목록을 불러오는 중 오류 발생");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // 검색어에 따라 필터링 수행
  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    // 선수 검색
    const filtered = players.filter((player) => {
      const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
      return fullName.includes(lowerQuery);
    });
    setFilteredPlayers(filtered);

    // 팀 검색
    const matchedTeams = teams
      .filter((team) => team.name.toLowerCase().includes(lowerQuery))
      .map((team) => team.name);
    setTeamResults(matchedTeams);

    // 스탯 용어 검색
    const matchedStatTerms = StatTerms.filter(
      (term) =>
        term.term.toLowerCase().includes(lowerQuery) ||
        term.meaning.toLowerCase().includes(lowerQuery)
    );
    setStatTermResults(matchedStatTerms);
  }, [query, players]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-8 bg-neutral-100 min-h-screen">
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="팀, 선수, 스탯 검색"
          value={query}
          onChange={handleSearchChange}
          className="border border-gray-400 px-3 py-2 rounded-md w-80"
        />
      </div>

      <h1 className="text-xl font-bold mb-4 text-blue-900">검색 결과</h1>

      {loading ? (
        <p className="text-gray-600">선수 목록 로딩 중...</p>
      ) : (
        <>
          {/* 팀 검색 결과 */}
          {teamResults.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold text-black">🏀 팀</h2>
              <ul className="list-disc pl-5">
                {teamResults.map((team, idx) => (
                  <li key={idx}>{team}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 선수 검색 결과 */}
          {filteredPlayers.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold text-black">👤 선수</h2>
              <ul className="list-disc pl-5">
                {filteredPlayers.map((player) => (
                  <li key={player.id}>
                    {player.first_name} {player.last_name} (
                    {player.team.full_name}, {player.position || "포지션 없음"})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 스탯 용어 검색 결과 */}
          {statTermResults.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold text-black">📖 스탯 용어</h2>
              <ul className="list-disc pl-5">
                {statTermResults.map((item) => (
                  <li key={item.id}>
                    <span className="font-bold">{item.term}</span>:{" "}
                    {item.meaning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 아무 결과도 없을 경우 */}
          {filteredPlayers.length === 0 &&
            teamResults.length === 0 &&
            statTermResults.length === 0 &&
            query && <p className="text-gray-600">검색 결과가 없습니다.</p>}
        </>
      )}
    </div>
  );
};

export default Search;
