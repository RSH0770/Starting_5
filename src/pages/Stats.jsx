import React, { useState } from "react";

const Stats = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setStats([]);
    setPlayerId(null);

    try {
      if (!playerName.trim()) {
        setError("선수 이름을 입력해주세요.");
        return;
      }

      const playerRes = await fetch(
        `/api/v1/players?search=${playerName.split(" ")[0]}`
      );

      if (!playerRes.ok) throw new Error("플레이어 정보 요청 실패");

      const playerData = await playerRes.json();
      if (playerData.data.length === 0) {
        setError("선수를 찾을 수 없습니다.");
        return;
      }

      const player = playerData.data[0];

      const statsRes = await fetch(
        `/api/v1/stats?player_ids[]=${player.id}&per_page=5`
      );
      if (!statsRes.ok) throw new Error("스탯 정보 요청 실패");

      const statsData = await statsRes.json();
      setStats(statsData.data);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-neutral-100">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        🏀 선수 스탯 검색
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="예: LeBron James"
          className="px-4 py-2 rounded-lg border border-gray-300 w-64"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">불러오는 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((game, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow border border-blue-200"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {game.game.date.slice(0, 10)} vs {game.team.abbreviation}
              </h2>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>PTS: {game.pts}</li>
                <li>REB: {game.reb}</li>
                <li>AST: {game.ast}</li>
                <li>STL: {game.stl}</li>
                <li>BLK: {game.blk}</li>
                <li>3PM: {game.fg3m}</li>
                <li>MIN: {game.min}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stats;
