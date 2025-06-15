import React, { useState } from "react";
import playerData from "../data/PlayerData";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredPlayers([]);
    } else {
      const results = playerData.filter(
        (player) =>
          player.name.toLowerCase().includes(term) ||
          player.team.toLowerCase().includes(term) ||
          (player.position && player.position.toLowerCase().includes(term))
      );
      setFilteredPlayers(results);
    }
    setSelectedPlayer(null);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setSearchTerm("");
    setFilteredPlayers([]);
  };

  const handleBackClick = () => {
    setSelectedPlayer(null);
    setSearchTerm("");
    setFilteredPlayers([]);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-blue-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        {!selectedPlayer ? (
          <>
            <h1 className="text-3xl font-bold text-center text-blue-50 mb-6">
              선수 검색
            </h1>
            <input
              type="text"
              placeholder="선수 이름, 팀, 포지션으로 검색..."
              className="w-full p-3 border border-blue-600 bg-blue-50 text-blue-950 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="max-h-80 overflow-y-auto">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="p-3 mb-2 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer border border-gray-600"
                  onClick={() => handlePlayerClick(player)}
                >
                  <p className="font-semibold text-gray-200">
                    {player.name}{" "}
                    <span className="text-gray-400">({player.team})</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    포지션: {player.position || "정보 없음"}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              뒤로 가기
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {selectedPlayer.name} ({selectedPlayer.team})
            </h2>
            <div className="text-gray-300">
              <div className="mb-2">
                <span className="font-semibold">나이:</span>{" "}
                {selectedPlayer.age}
              </div>
              {selectedPlayer.height_cm && (
                <div className="mb-2">
                  <span className="font-semibold">키:</span>{" "}
                  {selectedPlayer.height_cm} cm
                </div>
              )}
              {selectedPlayer.weight_kg && (
                <div className="mb-2">
                  <span className="font-semibold">몸무게:</span>{" "}
                  {selectedPlayer.weight_kg} kg
                </div>
              )}
              {selectedPlayer.position && (
                <div className="mb-2">
                  <span className="font-semibold">포지션:</span>{" "}
                  {selectedPlayer.position}
                </div>
              )}
              {(selectedPlayer.draft_year || selectedPlayer.draft_pick) && (
                <div className="mb-2">
                  <span className="font-semibold">드래프트:</span>
                  {selectedPlayer.draft_year
                    ? ` ${selectedPlayer.draft_year}년`
                    : ""}
                  {selectedPlayer.draft_pick
                    ? ` ${selectedPlayer.draft_pick}순위`
                    : ""}
                  {selectedPlayer.draft_round
                    ? ` (${selectedPlayer.draft_round}라운드)`
                    : ""}
                </div>
              )}
              {selectedPlayer.nationality && (
                <div className="mb-2">
                  <span className="font-semibold">국적:</span>{" "}
                  {selectedPlayer.nationality}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
