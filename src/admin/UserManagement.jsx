import React, { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ADMIN_UIDS = ["관리자_uid_1", "관리자_uid_2"];

const UserManagement = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
      return;
    }
    if (!ADMIN_UIDS.includes(user.uid)) {
      alert("관리자만 접근 가능합니다.");
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "users"));
    const userList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 관리자 권한 토글 (예: isAdmin 필드)
  const toggleAdmin = async (userId, currentIsAdmin) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isAdmin: !currentIsAdmin });
    fetchUsers();
  };

  if (!user || !ADMIN_UIDS.includes(user.uid)) {
    return <p>관리자만 접근 가능합니다.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">관리자 사용자 관리</h2>

      {loading ? (
        <p>사용자 로딩 중...</p>
      ) : users.length === 0 ? (
        <p>사용자가 없습니다.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="border-b">
              <th className="border p-2 text-left">이메일</th>
              <th className="border p-2 text-left">이름</th>
              <th className="border p-2 text-left">관리자 권한</th>
              <th className="border p-2 text-left">액션</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.displayName || "-"}</td>
                <td className="border p-2">{u.isAdmin ? "예" : "아니오"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => toggleAdmin(u.id, u.isAdmin)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    {u.isAdmin ? "관리자 해제" : "관리자 지정"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
