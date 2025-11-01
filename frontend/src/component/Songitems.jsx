import React, { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../context/user";
import { SongData } from "../context/Songcontext";

const Songitems = ({ image, id, desc, name }) => {
  const [saved, setSaved] = useState(false);
  const { saveplaysong, user } = UserData();
  const { setSelectedSong, setIsplaying } = SongData();
  const playLists = user.playlist;

  useEffect(() => {
    if (playLists && playLists.includes(id)) setSaved(true);
  }, [user, id, playLists]);

  const savedHandler = () => {
    setSaved(!saved);
    saveplaysong(id);
  };

  return (
    <div
      onClick={() => {
        setSelectedSong(id);
        setIsplaying(true);
      }}
      className="p-2 rounded-lg cursor-pointer w-[180px] hover:bg-[#ffffff1a] transition-colors duration-200 group"
    >
      {/* Song image */}
      <div className="w-[180px] h-[170px] overflow-hidden rounded-lg relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />

        <button
          className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();  //the click event bubbles up — it runs handlers on the child first, then on the parent.
            setSelectedSong(id);
            setIsplaying(true);
          }}
        >
          <FaPlay />
        </button>

        <button
          className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            savedHandler();
          }}
        >
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Song text */}
      <p className="font-semibold text-white mt-3 truncate">{name}</p>
      <p className="text-sm text-gray-400 truncate">{desc}</p>
    </div>
  );
};

export default Songitems;
