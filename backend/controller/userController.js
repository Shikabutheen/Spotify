import { User } from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

// REGISTER (POST user data to database)
const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body; // from frontend

  // 1. Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  // 2. Encrypt password
  const hashPassword = await bcrypt.hash(password, 10);

  // 3. Save user in DB
  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  // 4. Create JWT & store in cookie
  generateToken(user._id, res);

  // 5. Response success
  res.status(201).json({
    message: "User Registered Successfully",
    user,
  });
});

export default registerUser;
