import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;  //  cleaner way

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);  // correct key name

    req.user = await User.findById(decodedData.id).select("-password"); //  remove password always

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next(); //  ONLY after setting req.user
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
