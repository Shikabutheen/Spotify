import { User } from "../models/user.js";
import TryCatch from "../utils/TryCatch.js";

export const saveplaylist=TryCatch(async(req,res)=>{

    const user =await User.findById(req.user._id)

     if (user.playlist.includes(req.params.id)) {
    const index = user.playlist.indexOf(req.params.id);

    user.playlist.splice(index, 1);

    await user.save();

    return res.json({
      message: "Removed from playlist",
    });
  }

  user.playlist.push(req.params.id);

  await user.save();

  return res.json({
    message: "added to playlist",
  });
})