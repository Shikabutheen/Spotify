import { User } from "../models/user.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";

 const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong Password" });
  }

  generateToken(user._id, res);

  res.status(200).json({
    message: "Login Successful",
    user,
  });
});
export default loginUser;