import Admin from "../Models/admin.model.js";
import bcrypt from "bcryptjs";

export const adminRegister = (async (req, res) => {
    try {
        const adminExists = await Admin.findOne();
        if (adminExists) return res.status(400).json({ error: "Admin already exists. Registration is disabled." });

        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "All fields are required" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});