import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { UserData } from "../context/user";

const Navbar = () => {
  const navigate = useNavigate();
  const {logoutUser}=UserData()

  return (

    <>    <nav className="w-full flex justify-between items-center font-semibold p-4">
      <div className="flex flex-row justify-start gap-2">
        <div className="flex items-center gap-2">
          <FaArrowLeft
            className="w-8 h-8 text-white bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaArrowRight
            className="w-8 h-8 text-white bg-black p-2 rounded-2xl  cursor-pointer"
            onClick={() => navigate(1)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>

           <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Install App
          </p>

           <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
            onClick={() => logoutUser(navigate)}>
          
            Logout
          </p>

      </div>
    </nav>


    <div className="flex items-center gap-2 mt-4">

      <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
        All
      </p>

      <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">

        Music
      </p>

      <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">

          Podcasts
      </p>
      <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer  md:hidden"  onClick={()=> navigate('/playlist')}>

          Playlist
      </p>
    </div>
    </>
 

    
  );
};

export default Navbar;
