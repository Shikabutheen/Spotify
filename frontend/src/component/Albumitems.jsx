import React from "react";
import { useNavigate } from "react-router-dom";

const Albumitems = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/album/" + id)}
      className="p-3 rounded-lg cursor-pointer w-[190px] hover:bg-[#ffffff1a] transition-colors duration-200"
    >
      {/* Album image....... */}
      <div className="w-[180px] h-[180px] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-40 h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Album text */}
      <p className="font-semibold text-white mt-3 truncate">{name}</p>
      <p className="text-sm text-gray-400 truncate">{desc}</p>
    </div>
  );
};

export default Albumitems;
