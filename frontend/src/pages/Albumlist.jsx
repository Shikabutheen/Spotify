import React, { useEffect } from "react";
import Layout from "../component/Layer";
import { SongData } from "../context/Songcontext";
import { useParams } from "react-router-dom";
import logo from "../assets/spotify_logo.png";
import { UserData } from "../context/user";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Albumlist = () => {
  const { AlbumSong, albuminsong, albumdata ,setSelectedSong,setIsplaying} = SongData();

  const params = useParams();

  useEffect(() => {
    AlbumSong(params.id);
  }, [params.id]);


  // song play click
  const onclickHander=(id)=>{
    setSelectedSong(id)
    setIsplaying(true)
  }

  // saved Song item card
  const{saveplaysong}=UserData();

  const savePlayListHandler=(id)=>{
    saveplaysong(id)
  }



  return (
    <Layout>
   
        {albumdata && (
               <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {albumdata.thumbnail ? (
              <img
                src={albumdata.thumbnail.url}
                alt=""
                className="w-48 rounded"
              />
            ) : (
              <img src="https://via.placeholder.com/250" alt="" />
            )}

            <div className="flex flex-col">
              <p>PlayLists</p>

              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumdata.title} Playlist
              </h2>
              <h4>{albumdata.description}</h4>
              <p className="mt-1">
                <img src={logo} className="inline-block w-6" alt="" />
              </p>
            </div>

            
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
              <p className="">
                <b className="mt-4">#</b>
              </p>
              <p>Artist</p>
              <p className="hidden sm:block ">Description</p>

              <p className="text-center ">Actions</p>
            </div>



               {albuminsong && albuminsong.map((e,i)=>(
                      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" key={i}>
                     <p className="flex items-center gap-3">{i+1}{albuminsong?(<img src={e.thumbnail.url} alt="" className="w-10 h-10 rounded" /> ):( <img src="https://via.placeholder.com/250" alt="" />)}
                     {e.title}</p>
                     <p className="text=[15px]  ">{e.singer}</p>
                     <p className="text-[15px] hidden sm:block">
                            {e.description.slice(0, 20)}...
                          </p>
              
                     <p className="flex justify-center items-center gap-5">
              
                       <p
                              className="text-[15px] text-center"
                              onClick={() => savePlayListHandler(e._id)}
                            >
                              <FaBookmark />
                            </p>
                            <p
                              className="text-[15px] text-center"
                              onClick={() => onclickHander(e._id)}
                            >
                              <FaPlay />
                            </p>
                     </p>
                      </div>
                    ))}
              </>
        )}
    
    </Layout>
  );
};

export default Albumlist;
