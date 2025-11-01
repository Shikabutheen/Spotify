import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/user.js";


export const myprofile= TryCatch(async(req,res)=>{
    const user =await User.findById(req.user._id)
    res.json(user) // this rq from is isAuth.js
})