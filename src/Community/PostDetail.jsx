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

const ADMIN_UIDS = ["관리자_uid_1", "관리자_uid_2"]; // 관리자 uid 배열

const PostDetail = () => {
  const { id: postId } = useParams(); // id 파라미터를 postId로 매핑
  const user = auth.currentUser;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const isAdmin = user && ADMIN_UIDS.includes(user.uid);

  // 게시물 정보 불러오기 (한번만)
  useEffect(() => {
    console.log("PostDetail useEffect - postId:", postId);
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Post data:", docSnap.data());
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  // 댓글 실시간 구독
  useEffect(() => {
    if (!postId) return;
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));
    // 댓글은 comments 컬렉션에 있고 postId 필드로 연결되어 있음
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredComments = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((comment) => comment.postId === postId);
      setComments(filteredComments);
    });
    return () => unsubscribe();
  }, [postId]);

  // 댓글 추가
  const handleAddComment = async () => {
    if (!user) {
      alert("댓글 작성은 로그인 후 가능합니다.");
      return;
    }
    if (!commentInput.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }
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

  // 댓글 삭제 (관리자 또는 댓글 작성자)
  const handleDeleteComment = async (commentId, authorId) => {
    if (!isAdmin && user?.uid !== authorId) {
      alert("댓글 삭제 권한이 없습니다.");
      return;
    }
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "comments", commentId));
    }
  };

  if (!post) return <p>게시물을 불러오는 중입니다...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="mb-6">작성자: {post.author}</p>

      <div className="mb-6 whitespace-pre-wrap">{post.content}</div>

      <h3 className="text-xl font-semibold mb-2">댓글</h3>
      {comments.length === 0 && <p>댓글이 없습니다.</p>}
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="mb-2 border p-2 rounded flex justify-between"
          >
            <span>
              <strong>{comment.author}</strong>: {comment.content}
            </span>
            {(isAdmin || user?.uid === comment.authorId) && (
              <button
                onClick={() =>
                  handleDeleteComment(comment.id, comment.authorId)
                }
                className="text-red-600 hover:underline"
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>

      {user ? (
        <div className="mt-4">
          <textarea
            rows={3}
            className="w-full border rounded p-2"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            댓글 작성
          </button>
        </div>
      ) : (
        <p>댓글을 작성하려면 로그인해주세요.</p>
      )}
    </div>
  );
};

export default PostDetail;
