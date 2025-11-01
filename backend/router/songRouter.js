import express from 'express'
import { isAuth } from '../middleware/isAuth.js';
import uploadFile from '../middleware/multer.js';
import { addSong, addThumbnail, CreateAlbum, deleteSong, getAllAlbums, getAllSongByAlbum, getAllsongs, getSingleSong } from '../controller/SongContoller.js'


const router =express.Router()

router.post('/album/new',isAuth,uploadFile,CreateAlbum); // create tha album

router.get('/album/all',isAuth,getAllAlbums)  // get albums

router.post('/new',isAuth,uploadFile,addSong) // add songs

router.post('/thumbnail/:id', isAuth,uploadFile, addThumbnail); //add  song img thumbills

router.delete('/delete/:id',isAuth,deleteSong) // this deleted Songs

router.get('/single/:id',isAuth,getSingleSong) // this   single Songs

router.get('/all/song',isAuth,getAllsongs) //get all songs

router.get('/album/:id',isAuth,getAllSongByAlbum) // all song with album id


export default router;