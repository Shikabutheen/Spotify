import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,     // Secure (JS can't access — prevents XSS)
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  return token; //  Always good practice to also return it
};

export default generateToken;
