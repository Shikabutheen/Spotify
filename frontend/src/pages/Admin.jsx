import React, { useEffect ,useState } from "react";
import { UserData } from "../context/user";
import { useNavigate, Link } from "react-router-dom";
import { SongData } from "../context/Songcontext";
import toast from "react-hot-toast";
/// delete icon
import { MdDelete } from 'react-icons/md';

const Admin = () => {
  const { user } = UserData(); // for checking user role to admin
  const { album, song ,addAlbum,loading,addSong,addSongThumbnail ,deletedSong} = SongData();

  const navigate = useNavigate();

  // React best practice - redirect inside useEffect
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

   const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const [singer, setSinger] = useState("");
  const [file, setFile] = useState(null);
    const [albums, setAlbum] = useState("");


  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

//   add Albumsubmit

const addAlbumSumbit=(e)=>{
    e.preventDefault(); //default reload

    const formData =new FormData()  // FormData --Create a special container to upload both text + files properly.

    formData.append("title",title);
    formData.append("description",description);
    formData.append("file",file);

  addAlbum(formData,setTitle,setDescription,setFile)


}
//Add Song
const addSongSumbit=(e)=>{
    e.preventDefault(); //default reload

    const formData =new FormData()  // FormData --Create a special container to upload both text + files properly.

    formData.append("title",title);  //add title like evry adding items using append
    formData.append("description",description);
    formData.append("singer",singer);
    formData.append("album",albums);
    formData.append("file",file);

  addSong(formData,setTitle,setDescription,setSinger,setAlbum,setFile);

}
  //Add Song Img thumbnail..............
  
const addThumbnailHandler = (id) => {
    // if (!file) {
    //   toast.error("Please select an image first!");
    //   return;
    // }
    const formData = new FormData();
    formData.append("file", file);
    addSongThumbnail(id,formData, setFile);
};

// Deleted Handler

const DeltedHandeler=(id)=>{

    if(confirm("are you sure about to delete this song")){
        deletedSong(id)
    }
}


  return (
    <>
      <div className="min-h-screen bg-[#212121] text-white p-8">
        <Link
          to="/"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Go To Home Page
        </Link>

        {/* ADD ALBUM UI */}
        <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>

        <form className="bg-[#181818] p-6 rounded-lg shadow-lg"  
           onSubmit={addAlbumSumbit}
  >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" placeholder="Title" className="auth-input"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            
            required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input type="text" placeholder="Description" className="auth-input" 
                  value={description}
            onChange={e=>setDescription(e.target.value)}
            required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input type="file" accept="image/*" className="auth-input" onChange={fileChangeHandler} required />
          </div>

          <button disabled={loading} className="auth-btn" style={{ width: "100px" }}>{loading?"Please wait..":"Add"}</button>
        </form>

        {/* ADD SONG UI */}


        <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>
        <form  onSubmit={addSongSumbit} className="bg-[#181818] p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" placeholder="Title" className="auth-input"
                  value={title}
            onChange={e=>setTitle(e.target.value)}
            
            required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input type="text" placeholder="Description" className="auth-input"
            
                  value={description}
            onChange={e=>setDescription(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Singer</label>
            <input type="text" placeholder="Singer" className="auth-input"
            value={singer}  onChange={e=>setSinger(e.target.value)} required />
          </div>
           
          <select className="auth-input" value={albums} onChange={e=>setAlbum(e.target.value)}>
            <option value="">Choose Album</option>
            {album &&
              album.map((e, i) => (
                // this taking from album id with title name
                <option value={e._id} key={i}>    
                  {e.title}
                </option>
              ))}
          </select>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Audio</label>
            <input type="file" className="auth-input" accept="audio/*" onChange={fileChangeHandler} required />
          </div>

          <button disabled={loading} className="auth-btn" style={{ width: "100px" }}>{loading?"Please wait..":"Add Song"}</button>
        </form>



        {/* SHOW SONG LIST */}


        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
          <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
            {song &&
              song.map((e, i) => (
                <div key={i} className="bg-[#181818] p-4 rounded-lg shadow-md">
                 {e.thumbnail ? (
                        <img src={e.thumbnail.url} alt="" className="rounded-md w-52 h-52" />
                        ) : (
                        <div className="flex flex-col justify-center items-center gap-2">
                          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />


                            <button 
                            onClick={() => addThumbnailHandler(e._id)}  
                            className="bg-green-500 text-white px-2 py-1 rounded"
                            disabled={loading}
                            >
                            {loading ? 'Uploading...' : 'Add Thumbnail'}
                            </button>
                        </div>
                        )}



                

                  {/* add song items */} 
                 <h4 className="text-lg font-bold">{e.title}</h4>  
                <h4 className="text-sm text-gray-500">{e.singer}</h4>
                <h4 className="text-sm text-gray-500">{e.description}</h4>
                <button  onClick={()=>DeltedHandeler(e._id)}
                 className="px-3 py-1 bg-red-500 text-white rounded my-2"><MdDelete/></button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
