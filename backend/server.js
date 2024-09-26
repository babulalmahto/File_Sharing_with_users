import express from 'express'


const app=express();
const PORT =4080;
const localhost='127.0.0.8'


app.listen(PORT, ()=>{
    console.log(`Server Started at http//:${localhost}:${PORT}`)
})