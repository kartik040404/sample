import Client from "../Models/client.model.js";

export const readMessage = async (req, res) => {
    try {
        const { id } = req.params; // Extract message ID
        console.log("Received request to mark as read, ID:", id);

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: "Message ID is required" });
        }

        // Update the message
        const message = await Client.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        // Check if message exists
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(200).json({ message: "Message marked as read", data: message });
    } catch (err) {
        console.error("Error marking message as read:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const trashedMessage = async (req, res) => {
    try {
        const { id } = req.params; // Extract message ID
        console.log("Received request to move to trash, ID:", id);

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: "Message ID is required" });
        }

        // Update the message
        const message = await Client.findByIdAndUpdate(
            id,
            { trashed: true, starred: false },
            { new: true }
        );

        // Check if message exists
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(200).json({ message: "Message moved to trash", data: message });
    } catch (err) {
        console.error("Error moving message to trash:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const starredMessage = async (req, res) => {
    try {
        console.log("Request received for toggling starred status.");
        console.log("Params:", req.params);

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Message ID is required" });
        }

        // Find the message and toggle its `starred` status
        const message = await Client.findById(id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        console.log("Message found:", message);
        message.starred = !message.starred; // Toggle `starred` field
        console.log("Message after toggling:", message);
        await message.save();
        console.log("Message after saving to db:", message);
        res.status(200).json({ message: "Message starred status updated", data: message });
    } catch (err) {
        console.error("Error updating starred status:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const restoreMessage = async (req, res) => {
    try {
        console.log("Request received for restoring message.");
        console.log("Params:", req.params);

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Message ID is required" });
        }

        // Find the message and negate its `trashed` status
        const message = await Client.findById(id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        message.trashed = !message.trashed; // Toggle `trashed` field
        await message.save();

        res.status(200).json({ message: "Message restore status updated", data: message });
    } catch (err) {
        console.error("Error restoring message:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Request received to delete message, ID:", id);

        if (!id) {
            return res.status(400).json({ error: "Message ID is required" });
        }

        // Find and delete the message
        const deletedMessage = await Client.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(200).json({ message: "Message permanently deleted", data: deletedMessage });
    } catch (err) {
        console.error("Error deleting message:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};