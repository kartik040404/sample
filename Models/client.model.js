import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }, 
    read: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
}, { timestamps: true });

const Client = mongoose.model('Client', ClientSchema);

export default Client;