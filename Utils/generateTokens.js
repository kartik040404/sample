import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6d" });

    res.cookie("jwt", token, {
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Lax",
        maxAge: 6 * 24 * 60 * 60 * 1000,
    });
};

export default generateToken;
