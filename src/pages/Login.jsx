import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import useAuth from "../auth/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const user = useAuth();

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-200">
        <div className="bg-white p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">이미 로그인되었습니다</h2>
          <p className="text-blue-600 mb-4">{user.email}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      navigate("/"); // 로그인 후 이동할 페이지
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="bg-blue-800 p-8 rounded-2xl shadow-xl w-96">
        <div className="bg-blue-100 p-5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            로그인
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-blue-50 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-blue-50 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-green-500 hover:bg-neutral-700 text-white py-2 rounded-xl font-semibold transition"
            >
              로그인
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            계정이 없으신가요?{" "}
            <button
              onClick={() => navigate("/SignUp")}
              className="text-blue-600 hover:underline"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
