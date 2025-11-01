import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState, createContext, useEffect } from "react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState([]); // all songs
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);
  const [album, setAlbum] = useState([]);//get album
  const [selectedsong, setSelectedSong] = useState(null);
  const [isplaying, setIsplaying] = useState(false);

  //  should be null (object), not []
  const [singlesong, setSingleSong] = useState(null);

  // Fetch all songs
  async function getSongs() {
    try {
      const { data } = await axios.get("/api/song/all/song");
      setSong(data);

      if (data.length > 0) {
        setSelectedSong(data[0]._id); // select first song
        setIsplaying(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch a single song
  async function getSinglesong() {
    if (!selectedsong) return; //  safety check
    try {
      const { data } = await axios.get("/api/song/single/" + selectedsong);
      setSingleSong(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Add album
  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      toast.success(data.message);
      await getAlbum();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Get all albums
  async function getAlbum() {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setAlbum(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Add song
  async function addSong(formData, setTitle, setDescription, setSinger, setAlbum, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      toast.success(data.message);
      await getSongs();
      setTitle("");
      setDescription("");
      setSinger("");
      setAlbum("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Add song thumbnail
  async function addSongThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/song/thumbnail/${id}`, formData);
      toast.success(data.message);
      await getSongs();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Delete song
  async function deletedSong(id) {
    try {
      const { data } = await axios.delete(`/api/song/delete/${id}`);
      toast.success(data.message);
      await getSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  //  Album in song......

  const[albuminsong,setAlbuminsong]=useState([]);
  const[albumdata,setAlbumData]=useState([])

  async function AlbumSong(id) {
    try {
      const {data}= await axios.get(`/api/song/album/${id}`)
      setAlbuminsong(data.songs) //beace we backend send like this
      setAlbumData(data.album)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getSongs();
    getAlbum();
  }, []);

  return (
    <SongContext.Provider
      value={{
        song,
        addAlbum,
        loading,
        songLoading,
        album,
        addSong,
        addSongThumbnail,
        deletedSong,
        setSongLoading,
        isplaying,
        singlesong,
        setIsplaying,
        selectedsong,
        setSelectedSong,
        getSongs,
        getAlbum,
        getSinglesong,
        AlbumSong,
        albuminsong,
        albumdata,
        setAlbumData,setAlbuminsong
        
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
