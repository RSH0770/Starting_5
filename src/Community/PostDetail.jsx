import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../auth/firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const PostDetail = () => {
  const { id: postId } = useParams();
  const user = auth.currentUser;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().role === "admin");
      } catch (error) {
        console.error("관리자 확인 실패:", error);
      }
    };
    checkAdmin();
  }, [user]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("게시물 로드 실패:", error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((c) => c.postId === postId);
      setComments(filtered);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!user) return alert("로그인 후 작성해주세요.");
    if (!commentInput.trim()) return alert("댓글 내용을 입력하세요.");
    try {
      await addDoc(collection(db, "comments"), {
        postId,
        content: commentInput,
        author: user.displayName || user.email || "익명",
        authorId: user.uid,
        createdAt: new Date(),
      });
      setCommentInput("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  const handleDeleteComment = async (commentId, authorId) => {
    if (!isAdmin && user?.uid !== authorId) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "comments", commentId));
    }
  };

  if (!post) return <p className="p-10 text-xl">게시물을 불러오는 중...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="bg-blue-900 rounded-2xl text-white p-6 mb-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
        <p className="text-sm text-blue-100 mb-4">작성자: {post.author}</p>
        <div className="bg-white rounded-xl p-4">
          <div className="whitespace-pre-wrap text-base text-black">
            {post.content}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">댓글</h3>
        {comments.length === 0 ? (
          <p className="text-blue-500">아직 댓글이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border border-blue-200 p-3 rounded-lg flex justify-between items-start bg-blue-50"
              >
                <div>
                  <p className="font-bold text-blue-900">{comment.author}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                {(isAdmin || user?.uid === comment.authorId) && (
                  <button
                    onClick={() =>
                      handleDeleteComment(comment.id, comment.authorId)
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {user ? (
          <div className="mt-6">
            <textarea
              rows={3}
              className="w-full border border-blue-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="댓글을 입력하세요"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              댓글 작성
            </button>
          </div>
        ) : (
          <p className="mt-4 text-blue-500">
            댓글을 작성하려면 로그인해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
