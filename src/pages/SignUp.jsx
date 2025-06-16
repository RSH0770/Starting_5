import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../auth/firebase.js";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirm) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입이 완료되었습니다!");
      navigate("/Login");
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-200">
      <div className="bg-blue-900 p-8 rounded-2xl shadow-xl w-96">
        <div className="bg-neutral-300 p-5 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">회원가입</h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border p-2 rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
