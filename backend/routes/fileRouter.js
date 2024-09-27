import express from 'express'
import upload from '../config/multer.js';
import {listFile, removeFile, uploadFile} from '../controllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/upload', upload.single('file'), uploadFile);
fileRouter.get('/list', listFile);
fileRouter.post('/remove', removeFile)


export default fileRouter;