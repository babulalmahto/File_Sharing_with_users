import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    file: { type: String, required: true }
})

const fileModel = mongoose.models.file || mongoose.model("file", fileSchema);

export default fileModel;