import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import useAuth from "../auth/useAuth";
import { signOut } from "firebase/auth";

const btnStyle =
  "p-2 font-bold text-blue-950 border-blue-50 rounded-2xl hover:text-blue-800";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const home = () => navigate("/");
  const login = () => navigate("/Login");
  const introduce = () => navigate("Introduce");
  const community = () => navigate("Community");
  const stats = () => navigate("Stats");
  const search = () => navigate("Search");

  const logout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-around bg-blue-100 rounded-b-sm">
        <div className="flex justify-start">
          <img
            src="src\assets\Starting_5_Logo.png"
            className="w-27 h-15 ml-5"
            onClick={home}
          ></img>
        </div>

        <div onClick={introduce} className={btnStyle}>
          Introduce
        </div>
        <div onClick={community} className={btnStyle}>
          Community
        </div>
        <div onClick={stats} className={btnStyle}>
          Stats
        </div>
        <div onClick={search} className={btnStyle}>
          Search
        </div>

        {user ? (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-blue-800 font-semibold">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="border-1 rounded-lg bg-red-600 border-red-600 p-0.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={login}
            className="p-2 font-bold text-blue-950 hover:text-blue-800"
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
