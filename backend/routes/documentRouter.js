import express from 'express';
import { documentShareController } from '../controllers/documentController.js';

const documentRoter = express.Router();


documentRoter.post('/share', documentShareController)

export default documentRoter