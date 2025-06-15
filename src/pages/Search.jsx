import React, { useState } from "react";
import playerData from "../data/PlayerData"; // 선수 데이터
import StatTerm from "../data/StatTerm"; // 스탯 용어 데이터
import { teams } from "../data/Team"; // 팀 데이터

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    players: [],
    statTerms: [],
    teams: [],
  });
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 선수/팀/용어
  const [selectedType, setSelectedType] = useState(null); // 선택된 항목의 타입 (player, statTerm, team)

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedItem(null); // 검색 시 선택된 항목 초기화
    setSelectedType(null); // 검색 시 선택된 타입 초기화

    if (term === "") {
      setSearchResults({ players: [], statTerms: [], teams: [] });
    } else {
      // 선수 검색
      const filteredPlayers = playerData.filter(
        (player) =>
          player.name.toLowerCase().includes(term) ||
          player.team.toLowerCase().includes(term) ||
          (player.position && player.position.toLowerCase().includes(term))
      );

      // 스탯 용어 검색
      const filteredStatTerms = StatTerm.filter(
        (stat) =>
          stat.term.toLowerCase().includes(term) ||
          stat.meaning.toLowerCase().includes(term)
      );

      // 팀 검색
      const filteredTeams = teams.filter(
        (team) =>
          team.name.toLowerCase().includes(term) ||
          team.abbreviation.toLowerCase().includes(term)
      );

      setSearchResults({
        players: filteredPlayers,
        statTerms: filteredStatTerms,
        teams: filteredTeams,
      });
    }
  };

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setSearchTerm(""); // 검색어 초기화
    setSearchResults({ players: [], statTerms: [], teams: [] }); // 결과 초기화
  };

  const handleBackClick = () => {
    setSelectedItem(null);
    setSelectedType(null);
    setSearchTerm("");
    setSearchResults({ players: [], statTerms: [], teams: [] });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-blue-900 p-6 rounded-2xl shadow-lg w-full max-w-xl">
        {!selectedItem ? (
          <>
            <h1 className="text-3xl font-bold text-center text-blue-50 mb-6">
              농구 정보 검색
            </h1>
            <input
              type="text"
              placeholder="선수, 팀, 스탯 용어를 검색하세요..."
              className="w-full p-3 border border-blue-600 bg-blue-50 text-blue-950 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />

            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {searchTerm &&
                (searchResults.players.length > 0 ||
                searchResults.statTerms.length > 0 ||
                searchResults.teams.length > 0 ? (
                  <>
                    {/* 선수 검색 결과 */}
                    {searchResults.players.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-100 mb-2">
                          선수
                        </h2>
                        <ul className="space-y-2">
                          {searchResults.players.map((player) => (
                            <li
                              key={`player-${player.id}`}
                              className="p-3 bg-blue-800 hover:bg-blue-700 rounded-lg cursor-pointer transition duration-200 ease-in-out border border-blue-700 text-white"
                              onClick={() => handleItemClick(player, "player")}
                            >
                              <p className="font-semibold text-lg">
                                {player.name}{" "}
                                <span className="text-blue-300">
                                  ({player.team})
                                </span>
                              </p>
                              <p className="text-sm text-blue-200">
                                포지션: {player.position || "정보 없음"}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 팀 검색 결과 */}
                    {searchResults.teams.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-100 mb-2">
                          팀
                        </h2>
                        <ul className="space-y-2">
                          {searchResults.teams.map((team) => (
                            <li
                              key={`team-${team.id}`}
                              className="p-3 bg-blue-800 hover:bg-blue-700 rounded-lg cursor-pointer transition duration-200 ease-in-out border border-blue-700 text-white"
                              onClick={() => handleItemClick(team, "team")}
                            >
                              <p className="font-semibold text-lg">
                                {team.name}{" "}
                                <span className="text-blue-300">
                                  ({team.abbreviation})
                                </span>
                              </p>
                              <p className="text-sm text-blue-200">
                                소속 컨퍼런스:{" "}
                                {team.conf === "east" ? "동부" : "서부"}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 스탯 용어 검색 결과 */}
                    {searchResults.statTerms.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-100 mb-2">
                          스탯 용어
                        </h2>
                        <ul className="space-y-2">
                          {searchResults.statTerms.map((stat) => (
                            <li
                              key={`stat-${stat.id}`}
                              className="p-3 bg-blue-800 hover:bg-blue-700 rounded-lg cursor-pointer transition duration-200 ease-in-out border border-blue-700 text-white"
                              onClick={() => handleItemClick(stat, "statTerm")}
                            >
                              <p className="font-semibold text-lg">
                                {stat.term}
                              </p>
                              <p className="text-sm text-blue-200">
                                의미: {stat.meaning}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-blue-300 text-center py-4">
                    검색 결과가 없습니다.
                  </p>
                ))}
            </div>
          </>
        ) : (
          <div className="text-white">
            <button
              onClick={handleBackClick}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
              뒤로 가기
            </button>

            {selectedType === "player" && selectedItem && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-blue-50">
                  {selectedItem.name} ({selectedItem.team})
                </h2>
                <div className="bg-blue-800 p-4 rounded-lg shadow-inner text-blue-200 text-lg space-y-2">
                  <p>
                    <span className="font-semibold text-blue-100">나이:</span>{" "}
                    {selectedItem.age}
                  </p>
                  {selectedItem.height_cm && (
                    <p>
                      <span className="font-semibold text-blue-100">키:</span>{" "}
                      {selectedItem.height_cm} cm
                    </p>
                  )}
                  {selectedItem.weight_kg && (
                    <p>
                      <span className="font-semibold text-blue-100">
                        몸무게:
                      </span>{" "}
                      {selectedItem.weight_kg} kg
                    </p>
                  )}
                  {selectedItem.position && (
                    <p>
                      <span className="font-semibold text-blue-100">
                        포지션:
                      </span>{" "}
                      {selectedItem.position}
                    </p>
                  )}
                  {(selectedItem.draft_year || selectedItem.draft_pick) && (
                    <p>
                      <span className="font-semibold text-blue-100">
                        드래프트:
                      </span>
                      {selectedItem.draft_year
                        ? ` ${selectedItem.draft_year}년`
                        : ""}
                      {selectedItem.draft_pick
                        ? ` ${selectedItem.draft_pick}순위`
                        : ""}
                      {selectedItem.draft_round
                        ? ` (${selectedItem.draft_round}라운드)`
                        : ""}
                    </p>
                  )}
                  {selectedItem.nationality && (
                    <p>
                      <span className="font-semibold text-blue-100">국적:</span>{" "}
                      {selectedItem.nationality}
                    </p>
                  )}
                </div>
              </>
            )}

            {selectedType === "statTerm" && selectedItem && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-blue-50">
                  {selectedItem.term}
                </h2>
                <div className="bg-blue-800 p-4 rounded-lg shadow-inner text-blue-200 text-lg">
                  <p>
                    <span className="font-semibold text-blue-100">의미:</span>{" "}
                    {selectedItem.meaning}
                  </p>
                </div>
              </>
            )}

            {selectedType === "team" && selectedItem && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-blue-50">
                  {selectedItem.name} ({selectedItem.abbreviation})
                </h2>
                <div className="bg-blue-800 p-4 rounded-lg shadow-inner text-blue-200 text-lg">
                  <p>
                    <span className="font-semibold text-blue-100">
                      컨퍼런스:
                    </span>{" "}
                    {selectedItem.conf === "east"
                      ? "동부 컨퍼런스"
                      : "서부 컨퍼런스"}
                  </p>
                  <p className="mt-2 text-sm text-blue-300">
                    *팀의 자세한 정보는 다른 페이지에서 확인해주세요.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
