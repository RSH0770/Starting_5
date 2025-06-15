// Stats.jsx
import React, { useState } from "react";
import statsData from "../data/Stats"; // 'src/data/Stats.js'에 있을 경우

const Stats = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerAverageStats, setPlayerAverageStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setPlayers([]);
      setSelectedPlayer(null);
      setPlayerAverageStats(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedPlayer(null);
    setPlayerAverageStats(null);

    try {
      const filteredPlayers = statsData.filter((player) =>
        player.NAME.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setPlayers(filteredPlayers);
      if (filteredPlayers.length === 0) {
        setError("검색된 선수가 없습니다.");
      }
    } catch (err) {
      setError("선수 검색 중 오류 발생");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const displayPlayerStats = (player) => {
    setSelectedPlayer(player);
    setLoading(true);
    setError(null);

    try {
      setPlayerAverageStats({
        games: player.GP,
        pts: player.PTS,
        reb: player.REB,
        ast: player.AST,
        stl: player.STL,
        blk: player.BLK,
        tov: player.TOV,
        fg_pct: player["FG%"],
        fg3_pct: player["3P%"],
        ft_pct: player["FT%"],
      });
    } catch (err) {
      setError("선수 스탯 불러오기 실패");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-blue-900 shadow-2xl rounded-3xl p-8 border border-blue-700">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
          🏀 NBA 선수 스탯 조회
        </h1>

        {/* 검색 입력 및 버튼 섹션 */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="선수 이름 입력 (예: LeBron)"
            className="flex-grow p-3 rounded-xl border border-blue-600 bg-blue-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-inner transition-all duration-300"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            검색
          </button>
        </div>

        {loading && (
          <div className="text-center text-blue-200 text-lg font-medium animate-pulse">
            데이터 로딩 중...
          </div>
        )}
        {error && (
          <div className="text-red-400 mb-6 text-center text-lg font-semibold bg-red-900/30 p-3 rounded-lg border border-red-700 shadow-md">
            {error}
          </div>
        )}

        {/* 검색 결과 리스트 */}
        {!selectedPlayer && players.length > 0 && (
          <div className="mb-8 bg-blue-800 p-6 rounded-2xl shadow-xl border border-blue-700">
            <h2 className="font-bold text-2xl mb-4 text-white border-b border-blue-600 pb-2">
              🔍 검색 결과
            </h2>
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {players.map((player) => (
                <li
                  key={`${player.NAME}-${player.TEAM}`}
                  className="cursor-pointer bg-blue-700 hover:bg-blue-600 p-4 rounded-xl flex justify-between items-center transition-all duration-200 transform hover:scale-[1.01] shadow-md border border-blue-600"
                  onClick={() => displayPlayerStats(player)}
                >
                  <span className="font-semibold text-lg text-white">
                    {player.NAME}
                  </span>
                  <span className="text-sm text-blue-200 bg-blue-800 px-3 py-1 rounded-full border border-blue-600">
                    {player.TEAM || "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 선수 스탯 (평균 스탯만 표시) */}
        {selectedPlayer && (
          <div className="mt-10 text-white bg-blue-800 p-8 rounded-2xl shadow-xl border border-blue-700">
            <button
              onClick={() => {
                setSelectedPlayer(null);
                setPlayerAverageStats(null);
                setError(null);
                setSearchTerm("");
                setPlayers([]);
              }}
              className="mb-6 text-blue-300 hover:text-blue-100 hover:underline flex items-center gap-2 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 001.414 1.414L5.414 9H16a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              검색 결과로 돌아가기
            </button>

            <h2 className="text-3xl font-bold mb-4 text-white border-b border-blue-600 pb-3">
              {selectedPlayer.NAME} ({selectedPlayer.TEAM || "N/A"})
            </h2>
            <p className="text-lg text-blue-200 mb-6">
              나이:{" "}
              <span className="font-semibold">{selectedPlayer.AGE}세</span> |
              경기 출전:{" "}
              <span className="font-semibold">{selectedPlayer.GP}경기</span> |
              평균 출전 시간:{" "}
              <span className="font-semibold">{selectedPlayer.MIN}분</span>
            </p>

            {/* 평균 스탯 표시 */}
            {playerAverageStats && (
              <div className="p-6 bg-blue-700 rounded-xl shadow-lg border border-blue-600 mb-8">
                <h3 className="font-semibold text-2xl mb-4 text-white border-b border-blue-500 pb-2">
                  📊 시즌 평균 스탯 (총 {playerAverageStats.games}경기)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-blue-100">
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      득점 (PTS)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.pts}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      리바운드 (REB)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.reb}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      어시스트 (AST)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.ast}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      스틸 (STL)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.stl}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      블록 (BLK)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.blk}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      턴오버 (TOV)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.tov}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      야투% (FG%)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.fg_pct}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      3점% (3P%)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.fg3_pct}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-800 rounded-lg shadow-inner">
                    <span className="font-medium text-sm text-blue-300">
                      자유투% (FT%)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {playerAverageStats.ft_pct}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-blue-300 text-sm italic mt-6 p-4 bg-blue-700/50 rounded-lg border border-blue-600">
              <p>
                이 데이터는 각 선수의 시즌 평균 스탯입니다. 개별 경기 스탯은
                제공되지 않습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
