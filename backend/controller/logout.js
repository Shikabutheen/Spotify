import TryCatch from "../utils/TryCatch.js";

export const logout = TryCatch(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0) //  instantly remove cookie
  });

  res.status(200).json({ message: "Logged out successfully" });
});
