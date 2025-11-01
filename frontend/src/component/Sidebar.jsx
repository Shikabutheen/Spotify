import React from "react";
import search from "../assets/search.png";
import { useNavigate } from "react-router-dom";
// import { AiFillHome } from 'react-icons/ai';

import homwic from "../assets/home-1-svgrepo-com.svg";
import stack from "../assets/stack.png";
import arrow from "../assets/arrow.png";
import plus from "../assets/plus.png";
import Playlist from "./Playlist";
import { UserData } from "../context/user";

const Sidebar = () => {
  const navigate = useNavigate();

  const { user } = UserData();
  return (
    <>
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div
          className="bg-[#121212] h-[15%] rounded flex flex-col justify-around"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-3 pl-8 cursor-pointer ">
            <img src={homwic} className="w-6 " alt="" />
            <p className="font-bold">Home</p>
          </div>
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer "
            onClick={() => navigate("/")}
          >
            <img src={search} className="w-6 " alt="" />
            <p className="font-bold">Search</p>
          </div>
        </div>

        <div className="bg-[#121212] h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={stack} className="w-8" alt="" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <img src={arrow} className="w-8" alt="" />
              <img src={plus} className="w-8" alt="" />
            </div>
          </div>

          <div className="" onClick={() => navigate("/playlist")}>
            <Playlist />
          </div>

          <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Let's findsome podcasts to follow</h1>
            <p className="font-light">We'll keep you update on new episodes</p>

            <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
              {" "}
              Browse Podcasts
            </button>
          </div>

          {/* admindashbord  */}
          {user && user.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
            >
              Admin Dashborad
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
