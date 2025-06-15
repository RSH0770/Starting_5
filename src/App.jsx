import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import CommunityLayout from "./Community/CommunityLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Introduce from "./pages/Introduce";
import Stats from "./pages/Stats";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import PostList from "./Community/PostList";
import PostForm from "./Community/PostForm";
import PostDetail from "./Community/PostDetail";
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Introduce" element={<Introduce />} />
          <Route path="Stats" element={<Stats />} />
          <Route path="Search" element={<Search />} />

          {/* 커뮤니티 관련 라우팅 - CommunityLayout 하위 */}
          <Route path="Community" element={<CommunityLayout />}>
            <Route index element={<PostList />} />
            <Route path="new" element={<PostForm />} />
            <Route path=":id" element={<PostDetail />} />
          </Route>

          {/* 관리자 대시보드 및 관리페이지 */}
          <Route path="Admin" element={<AdminDashboard />} />
          <Route path="Admin/users" element={<UserManagement />} />
          <Route path="Admin/posts" element={<PostList />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
