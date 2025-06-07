import React, { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ADMIN_UIDS = ["관리자_uid_1", "관리자_uid_2"];

const CommentManagement = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
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

  const fetchComments = async () => {
    setLoading(true);
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const commentList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentList);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "comments", commentId));
      fetchComments();
    }
  };

  if (!user || !ADMIN_UIDS.includes(user.uid)) {
    return <p>관리자만 접근 가능합니다.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">관리자 댓글 관리</h2>

      {loading ? (
        <p>댓글 로딩 중...</p>
      ) : comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border p-3 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <strong>{comment.author}</strong> ({comment.postId}):{" "}
                {comment.content}
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-600 hover:underline"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentManagement;
