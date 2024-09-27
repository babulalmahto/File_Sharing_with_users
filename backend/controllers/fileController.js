import fileModel from '../models/fileModel.js';
import fs from 'fs';


// upload file
const uploadFile = async (req, res) => {
    let file_filename = `${req.file.filename}`

    const fileUpload = new fileModel({
        name: req.body.name,
        type: req.body.type,
        file: file_filename
    })
    try {
        await fileUpload.save();
        return res.status(201).send({ success: true, message: "File Added successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error' })
    }
}

// all file list
const listFile = async (req, res) => {
    try {
        const files = await fileModel.find({});
        return res.status(200).send({ success: true, data: files });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error' });
    }
}


// remove file item
const removeFile = async (req, res) => {
    try {
        const file = await fileModel.findById(req.body.id);
        fs.unlink(`uploads/${file.file}`, () => { })

        await fileModel.findByIdAndDelete(req.body.id);
        return res.status(200).send({ success: true, message: 'File Removed' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error' })
    }
}

export { uploadFile, listFile, removeFile }