import Client from "../Models/client.model.js";

//Store Client Inquiry
export const storeClientInquiries = ( async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newClient = new Client({ name, email, phone, subject, message });
        await newClient.save();
        res.status(201).json({ message: "Client form submitted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//  Fetch Client Inquiries (Protected Route)
export const fetchClientInquiries = ( async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});