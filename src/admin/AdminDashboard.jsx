import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">관리자 페이지</h1>
      <div className="space-y-4">
        <button onClick={() => navigate("/Admin/users")}>사용자 관리</button>
        <button onClick={() => navigate("/Admin/posts")}>게시물 관리</button>
        <button onClick={() => navigate("/Admin/comments")}>댓글 관리</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
