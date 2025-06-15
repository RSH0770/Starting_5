import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../auth/firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("로그인이 필요합니다.");
        navigate("/Login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author: auth.currentUser?.email || "익명",
        createdAt: serverTimestamp(),
      });
      alert("게시물이 등록되었습니다!");
      navigate("/Community");
    } catch (err) {
      console.error("게시글 등록 실패:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="bg-blue-900 rounded-2xl text-white p-6 mb-6 shadow-lg max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">게시물 작성</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-blue-300 bg-blue-50 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-blue-300 bg-blue-50 p-3 rounded-lg h-40 resize-none focus:outline-none focus:ring focus:ring-blue-300 text-black"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
