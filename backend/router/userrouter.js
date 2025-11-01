import express from 'express';
import registerUser from '../controller/userController.js'; // default import
import loginUser from '../controller/login.js';
import { isAuth } from '../middleware/isAuth.js';
import { myprofile } from '../controller/myprofile.js';
import { logout } from '../controller/logout.js';
import { saveplaylist } from '../controller/Savesong.js';

const router = express.Router();

router.post('/reg',registerUser); // register route
router.post('/login',loginUser) // login route

router.get('/me',isAuth,myprofile)  // profile get 

router.get('/logout',isAuth,logout)  //logout

router.post('/saved/:id',isAuth,saveplaylist)



export default router;
