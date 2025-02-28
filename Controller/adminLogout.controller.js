export const adminLogout = async (req, res) => {
    try {
        res.cookie("jwt", "", { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax", 
            expires: new Date(0) // Set expiration to clear the cookie
        });
        
        res.json({ message: "Successfully logged out!" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

