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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">게시물 작성</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded h-40"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default PostForm;
