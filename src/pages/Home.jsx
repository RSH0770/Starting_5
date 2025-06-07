import React from "react";
import { useNavigate } from "react-router-dom";

const titleStyle1 = "text-4xl font-bold";
const subtitleStyle = "text-xl font-semibold p-4 text-blue-100";
const titleContentStyle =
  "h-110 w-full md:w-1/4 border-neutral-400 rounded-2xl bg-blue-900 p-8 font-bold text-2xl text-white hover:bg-blue-800";
const ContentDetailStyle = "pt-2 text-sm text-blue-100";

const Home = () => {
  const navigate = useNavigate();
  const home = () => navigate("/");
  const login = () => navigate("/Login");
  const introduce = () => navigate("Introduce");
  const community = () => navigate("Community");
  const stats = () => navigate("Stats");

  return (
    <div className="h-auto min-h-screen p-10 mx-auto bg-blue-10">
      <div className="border-neutral-400 rounded-2xl bg-blue-900 text-white p-8">
        <div className="p-4">
          <h1 className={titleStyle1}>
            Starting <span className="font-extrabold text-red-600">5</span>
          </h1>
        </div>
        <h2 className={subtitleStyle}>
          Starting 5는 농구를 처음 접하거나, 관심이 있는 이들을 위한
          커뮤니티입니다.
        </h2>
        <h2></h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <div className={titleContentStyle} onClick={introduce}>
          더 깊이, 더 쉽게.
          <div className={ContentDetailStyle}>농구의 모든 것을 한눈에</div>
        </div>
        <div className={titleContentStyle} onClick={community}>
          함께 나누는 이야기.
          <div className={ContentDetailStyle}>소통하고, 배우고, 즐기세요</div>
        </div>
        <div className={titleContentStyle} onClick={stats}>
          숫자 너머의 이야기.
          <div className={ContentDetailStyle}>선수의 기록을 더 깊이 있게</div>
        </div>
        <div className={titleContentStyle} onClick={login}>
          로그인
          <div className={ContentDetailStyle}>다양한 사람들과 소통을 위해</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
