import bcrypt from "bcryptjs";
import Admin from "../Models/admin.model.js";
import generateToken from "../Utils/generateTokens.js";

export const adminLogin = ( async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "All fields are required" });

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ error: "Username is incorrect" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

        const token = generateToken(admin._id, res);
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


