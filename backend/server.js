import express from 'express'
import { connectdb } from './config/db.js';


const app=express();
const PORT =4080;
const localhost='127.0.0.8'


// db connection
connectdb()

app.listen(PORT, ()=>{
    console.log(`Server Started at http//:${localhost}:${PORT}`)
})