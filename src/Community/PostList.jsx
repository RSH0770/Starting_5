import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../auth/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const PostList = () => {
  const user = auth.currentUser;
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">게시판</h2>
      <div className="border-1 rounded-2xl bg-blue-900 p-4">
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-1 rounded-2xl bg-neutral-100 mb-2 p-3"
            >
              <Link
                to={`/Community/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title} - {post.author}
              </Link>
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
