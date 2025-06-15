import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg text-white">
        <h1 className="text-3xl font-bold text-center mb-8">관리자 대시보드</h1>{" "}
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin/posts"
              className="block bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center text-xl font-semibold shadow-md" // 버튼 스타일 강화
            >
              게시물 관리
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-center text-xl font-semibold shadow-md" // 버튼 스타일 강화
            >
              사용자 관리
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-center text-xl font-semibold shadow-md mt-10" // 상단 여백 추가
            >
              홈으로 돌아가기
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
