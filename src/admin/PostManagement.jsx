import React, { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ADMIN_UIDS = ["관리자_uid_1", "관리자_uid_2"];

const AdminPostManagement = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  // 관리자 확인 후 비관리자는 리다이렉트
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

  // 게시글 불러오기
  const fetchPosts = async () => {
    setLoadingPosts(true);
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const postList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postList);
    setLoadingPosts(false);
  };

  // 댓글 불러오기
  const fetchComments = async () => {
    setLoadingComments(true);
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const commentList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentList);
    setLoadingComments(false);
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  // 게시글 삭제
  const handleDeletePost = async (postId) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", postId));
      // 해당 게시글 댓글도 삭제 (옵션, 필요시 구현)
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("postId", "==", postId));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach(async (commentDoc) => {
        await deleteDoc(doc(db, "comments", commentDoc.id));
      });
      fetchPosts();
      fetchComments();
    }
  };

  // 댓글 삭제
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
      <h2 className="text-2xl font-bold mb-6">관리자 게시글 및 댓글 관리</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">게시글 목록</h3>
        {loadingPosts ? (
          <p>게시글 로딩 중...</p>
        ) : posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="border p-3 rounded mb-2 flex justify-between items-center"
              >
                <div>
                  <strong>{post.title}</strong> - {post.author}
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-600 hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">댓글 목록</h3>
        {loadingComments ? (
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
      </section>
    </div>
  );
};

export default AdminPostManagement;
