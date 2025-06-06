import React from "react";
import { teams } from "../data/Team.js";

const Introduce = () => {
  const eastTeams = teams.filter((team) => team.conf === "east");
  const westTeams = teams.filter((team) => team.conf === "west");

  return (
    <div className="h-auto min-h-screen p-10 mx-auto bg-neutral-100 text-white">
      <div className="bg-blue-900 p-6 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">
          What is Baseketball?
        </h1>

        <section className="mb-10">
          <ul className="text-lg leading-relaxed list-disc list-inside space-y-2 text-neutral-200">
            <li>
              농구는 5명이 손을 사용해 공을 링(림)에 던져 넣어 득점하는
              스포츠입니다.
            </li>
            <li>제한된 시간 안에 더 많은 점수를 얻은 팀이 승리합니다.</li>
            <li>
              빠른 속도와 역동적인 움직임, 팀워크가 중요한 매력적인 경기입니다.
            </li>
          </ul>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-100 text-blue-900 shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              🤝 경기 규칙
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-950">
              <li>경기 시간은 4쿼터, 각 10~12분입니다.</li>
              <li>공격은 24초 안에 시도되어야 합니다.</li>
              <li>슛이 성공하면 2점 또는 3점을 득점합니다.</li>
              <li>파울 시 자유투가 주어집니다.</li>
            </ul>
          </div>

          <div className="bg-neutral-100 text-blue-900 shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-3">
              ⛹️‍♂️ 농구의 매력
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-950">
              <li>빠른 전환과 전략적인 전개</li>
              <li>한순간에 바뀌는 승부의 묘미</li>
              <li>팀워크와 개인기, 그 완벽한 조화</li>
              <li>세계적으로 사랑받는 스포츠</li>
            </ul>
          </div>

          <div className="bg-neutral-100 text-blue-900 shadow-md rounded-2xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              📚 농구의 역사
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-950">
              <li>
                농구는 캐나다계 미국인 <strong>제임스 네이스미스</strong>가
                고안했습니다.
              </li>
              <li>양 팀 각 5명이 바스켓에 공을 넣어 득점하는 경기입니다.</li>
              <li>
                작은 공간에서도 즐길 수 있어 전 세계적으로 인기가 높습니다.
              </li>
            </ul>
          </div>

          <div className="bg-neutral-100 text-blue-900 shadow-md rounded-2xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              🏀 농구의 세 가지 핵심 기본기
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-950">
              <li>
                <strong>패스(Pass):</strong> 팀 간의 유기적인 연결
              </li>
              <li>
                <strong>드리블(Dribble):</strong> 상대를 제치고 공간을 만드는
                기술
              </li>
              <li>
                <strong>슛(Shoot):</strong> 점수를 만들어내는 결정적 기술
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-12 bg-neutral-100 p-6 rounded-xl text-blue-900">
          <h2 className="text-2xl font-semibold text-center text-red-500 mb-4">
            🌎 NBA 리그 소개
          </h2>
          <ul className="list-disc list-inside text-blue-950 space-y-2 mb-6">
            <li>
              NBA는 세계 최고의 프로 농구 리그로, 미국과 캐나다의 30개 팀이
              참가합니다.
            </li>
            <li>
              팀들은 <strong className="text-blue-700">동부 컨퍼런스</strong>와{" "}
              <strong className="text-red-700">서부 컨퍼런스</strong>로 나뉘고,
              6개의 디비전으로 구성되어 있습니다.
            </li>
            <li>정규 시즌과 플레이오프를 통해 챔피언을 가립니다.</li>
            <li>
              <strong>르브론 제임스</strong>, <strong>스테판 커리</strong>,{" "}
              <strong>케빈 듀란트</strong> 등 세계적인 스타들이 활약 중입니다.
            </li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-1 rounded-2xl bg-blue-700 p-2 mt-2">
              <h1 className="flex justify-center text-3xl font-bold text-white pb-2">
                Eastern Conference
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {eastTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex flex-row gap-3 p-2 bg-white shadow rounded-xl"
                  >
                    <img
                      src={`https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg`}
                      alt={`${team.name} logo`}
                      className="w-10 h-10"
                    />
                    <span className="flex place-items-center font-semibold text-lg text-gray-800">
                      {team.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-1 rounded-2xl bg-red-700 p-2 mt-2">
              <h1 className="flex justify-center text-3xl font-bold text-white pb-2">
                Western Conference
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {westTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-3 p-2 bg-white shadow rounded-xl"
                  >
                    <img
                      src={`https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg`}
                      alt={`${team.name} logo`}
                      className="w-10 h-10"
                    />
                    <span className="flex place-items-center font-semibold text-lg text-gray-800">
                      {team.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduce;
