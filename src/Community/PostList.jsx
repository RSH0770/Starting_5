import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../auth/firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const PostList = () => {
  const user = auth.currentUser;
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 여부 체크
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === "admin");
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("관리자 권한 확인 실패:", error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  // 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  // 게시글 삭제
  const handleDeletePost = async (postId) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="h-auto min-h-screen mx-auto p-10 bg-blue-50">
      <h2 className="text-xl font-bold mb-4">게시판</h2>
      <div className="border-1 rounded-2xl bg-blue-900 p-4">
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-1 rounded-2xl bg-neutral-100 mb-2 p-3 flex justify-between items-center"
            >
              <Link
                to={`/Community/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title} - {post.author}
              </Link>
              {isAdmin && (
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <Link
          to="/Community/new"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          게시물 작성
        </Link>
      )}
    </div>
  );
};

export default PostList;
