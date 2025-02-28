import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Read token from cookies
        if (!token) return res.status(401).json({ error: "Access Denied: No Token" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified; // Attach admin data to request
        next();
    } catch (err) {
        res.status(403).json({ error: "Access Denied: Invalid Token" });
    }
};

export default verifyToken;
