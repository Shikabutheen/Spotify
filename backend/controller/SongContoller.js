import { Album } from "../models/Album.js";
import { Song } from "../models/Song.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlgeneter.js";
import cloudinary from "cloudinary";

export const CreateAlbum = TryCatch(async (req, res) => {
  // Role check for admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }

  const { title, description } = req.body;

  // Basic validation
  if (!title || !description) {
    return res.status(400).json({ message: "Title & Description are required" });
  }

  //  Photo is required
//   if (!req.file) {
//     return res.status(400).json({ message: "Thumbnail image is required" });
//   }

  //  Convert buffer -> data uri (base64)

  const fileUrl = getDataUrl(req.file);

  //  Upload to cloudinary
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  //  Save in MongoDB
  await Album.create({
    title,
    description,
    thumbnail: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Album Created Successfully ",
  });
});


// Getting Album .............

export const getAllAlbums=TryCatch(async(req,res)=>{

    const albums=await Album.find()

    res.json(albums)   
    // put in song router 
})


//Add Songs...................

export const addSong = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are Not Admin" });
  }

  const { title, description, singer, album } = req.body;

  //  SAFETY CHECK
  if (!req.file) {
    return res.status(400).json({ message: "Audio file is required" });
  }

  // Convert file buffer to base64
  const fileUrl = getDataUrl(req.file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "video",   //  Cloudinary stores MP3 under video type
  });

  await Song.create({
    title,
    description,
    singer,
    audio: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    album,
  });

  res.json({ success: true, message: "Song Added Successfully" });
});




//Add Thumbnail --song img ..........................

export const addThumbnail = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "You are not an admin" });

  const file = req.file;
  if (!file) return res.status(400).json({ message: "Thumbnail image required" });

  const fileUrl = getDataUrl(file); 

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Song.findByIdAndUpdate(
    req.params.id, 
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      }
    },
    { new: true }
  );

  res.json({ message: "Thumbnail Added" });
});


// Geting All Songs....................
export const getAllsongs=TryCatch(async(req,res)=>{
    const songs=await Song.find()
    res.json(songs)
})


// get into album in songs
export const getAllSongByAlbum = TryCatch(async (req, res) => {
const album = await Album.findById(req.params.id);
  const songs = await Song.find({ album: req.params.id });

  res.json({ album, songs });
});



//Deleted Songs

export const deleteSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  await song.deleteOne(); //  Always `await`

  res.json({ message: "Song Deleted Successfully" });
});

//GetSingle Song.....

export const getSingleSong=TryCatch(async(req,res)=>{
  const song=await Song.findById(req.params.id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  res.json(song)

})


