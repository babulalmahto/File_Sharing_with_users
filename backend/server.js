import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectdb } from './config/db.js';
import userRouter from './routes/userRoute.js';
import fileRouter from './routes/fileRouter.js';
import documentRoter from './routes/documentRouter.js';

const app = express();
const PORT = 4080;
const localhost = '127.0.0.8'


// middleware
app.use(express.json());
app.use(cors())

// db connection
connectdb()

// Api EndPoints
app.use('/api/user', userRouter)
app.use('/api/file', fileRouter)
app.use("/files", express.static('uploads'))
app.use('/api/document', documentRoter);

app.listen(PORT, () => {
    console.log(`Server Started at http://${localhost}:${PORT}`)
})