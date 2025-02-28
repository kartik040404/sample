import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './Database/connectToMongoDB.js';

import adminRoutes from './Routes/admin.route.js';
import clientRoutes from './Routes/client.route.js';

import verifyToken from './Middleware/verifyToken.js';

dotenv.config();

const app = express();

app.use(express.json());
const corsOptions ={
    origin:'https://gavaligroup.com', 
    credentials:true,  
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware to Verify Token
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Access granted", admin: req.admin });
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);

//Port handling and server connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});

export default app;