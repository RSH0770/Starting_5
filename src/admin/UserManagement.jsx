import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../auth/firebase";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Firestore에서 사용자 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userList = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("사용자 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchUsers();
  }, []);

  // 권한(role) 변경
  const handleRoleChange = async (uid, newRole) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("권한 변경 중 오류 발생:", error);
    }
  };

  // 사용자 삭제
  const handleDeleteUser = async (uid) => {
    if (!window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "users", uid));
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
    } catch (error) {
      console.error("사용자 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          사용자 관리
        </h2>
        {users.length === 0 ? (
          <p className="text-white text-center text-lg">
            등록된 사용자가 없습니다.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 text-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-700 p-3 text-left">UID</th>
                  <th className="border border-gray-700 p-3 text-left">
                    이메일
                  </th>
                  <th className="border border-gray-700 p-3 text-left">이름</th>
                  <th className="border border-gray-700 p-3 text-left">권한</th>
                  <th className="border border-gray-700 p-3 text-center">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.uid}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="border border-gray-700 p-3">{user.uid}</td>
                    <td className="border border-gray-700 p-3">
                      {user.email || "없음"}
                    </td>
                    <td className="border border-gray-700 p-3">
                      {user.displayName || "없음"}
                    </td>
                    <td className="border border-gray-700 p-3">
                      {user.role || "user"}
                    </td>
                    <td className="border border-gray-700 p-3 text-center space-x-2">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => handleRoleChange(user.uid, "admin")}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          관리자 지정
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user.uid, "user")}
                          className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition-colors duration-200 text-sm"
                        >
                          일반 사용자로 변경
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.uid)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
