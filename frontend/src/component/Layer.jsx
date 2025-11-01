
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import Musixplayer from "./musixplayer";


const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
          <Navbar />
          {children}
        </div>
      </div>
     <Musixplayer/>
    </div>
  );
};

export default Layout;
