import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const titleStyle1 = "text-4xl font-bold";
const subtitleStyle = "text-xl font-semibold p-4 text-blue-100";
const titleContentStyle =
  "h-110 w-full md:w-1/4 border-neutral-400 rounded-2xl bg-blue-900 p-8 font-bold text-2xl text-white hover:bg-blue-800 cursor-pointer";
const ContentDetailStyle = "pt-2 text-sm text-blue-100";

// 관리자 페이지 내부의 버튼/타일 스타일 (너비는 부모 요소에 의해 결정되도록 수정)
const adminButtonTileStyle =
  "h-auto w-full border-neutral-400 rounded-2xl bg-red-600 p-8 font-bold text-2xl text-white hover:bg-red-400 cursor-pointer";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const introduce = () => navigate("Introduce");
  const community = () => navigate("Community");
  const stats = () => navigate("Stats");
  const login = () => navigate("Login");
  const admin = () => navigate("Admin");
  const profile = () => navigate("Profile");

  if (user?.isAdmin) {
    return (
      // 관리자 전용 전체 배경색을 더 어둡게 변경
      <div className="h-auto min-h-screen p-10 mx-auto bg-gray-900">
        {/* 관리자 대시보드 헤더 */}
        <div className="border-neutral-400 rounded-2xl bg-red-900 text-white p-8 mb-6 shadow-lg">
          <div className="p-4">
            <h1 className="text-4xl font-bold text-center">
              {" "}
              {/* 중앙 정렬 추가 */}
              관리자{" "}
              <span className="font-extrabold text-yellow-400">대시보드</span>
            </h1>
          </div>
          <h2 className="text-xl font-semibold p-4 text-yellow-100 text-center">
            {" "}
            {/* 중앙 정렬 추가 */}
            관리자 권한으로 로그인되어 있습니다.
          </h2>
        </div>

        {/* 관리자 컨텐츠 레이아웃 변경 */}
        <div className="flex justify-center pt-4">
          {" "}
          {/* 내부 컨텐츠를 중앙으로 정렬 */}
          {/* 관리자 패널 컨테이너: 더 넓은 영역을 차지하고 어두운 배경을 가짐 */}
          <div className="w-full md:w-3/4 lg:w-1/2 p-6 bg-gray-800 rounded-lg shadow-xl">
            {/* 관리자 페이지로 이동하는 버튼/타일 */}
            <div className={adminButtonTileStyle} onClick={admin}>
              관리자 페이지
              <div
                className={ContentDetailStyle.replace(
                  "text-blue-100",
                  "text-red-100"
                )}
              >
                {" "}
                {/* 관리자 테마에 맞게 텍스트 색상 변경 */}
                게시글/회원 관리 등
              </div>
            </div>
            {/* 추가 관리자 기능이 있다면 여기에 <div className={adminButtonTileStyle}> 를 추가할 수 있습니다. */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-screen p-10 mx-auto bg-blue-50">
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

        {!user && (
          <div className={titleContentStyle} onClick={login}>
            로그인
            <div className={ContentDetailStyle}>
              다양한 사람들과 소통을 위해
            </div>
          </div>
        )}

        {user && !user.isAdmin && (
          <div className={titleContentStyle} onClick={profile}>
            마이페이지
            <div className={ContentDetailStyle}>내 활동 보기</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
