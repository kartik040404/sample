import express from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { storeClientInquiries, fetchClientInquiries } from "../Controller/clientInquiries.controller.js";
import { readMessage, trashedMessage, starredMessage, restoreMessage, deleteMessage } from "../Controller/messageOperations.controller.js";

const router = express.Router();

router.post("/inquiries", storeClientInquiries);
router.get("/get-inquiries",verifyToken, fetchClientInquiries);
router.put("/inquiries/read/:id", verifyToken, readMessage);
router.patch("/inquiries/trash/:id", verifyToken, trashedMessage);
router.patch("/inquiries/star/:id", starredMessage);
router.patch("/inquiries/restore/:id", restoreMessage);
router.delete("/inquiries/delete/:id", verifyToken, deleteMessage);

export default router;