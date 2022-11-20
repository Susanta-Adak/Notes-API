import express from "express";
import noteRouter from './routes/noteRoutes.js';
import userRouter from './routes/userRoutes.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET, POST"
}));
app.use(express.json());

app.use("/users", userRouter);
app.use("/note", noteRouter);


app.get("/",(req, res)=>{
    res.send("Notes REST API.");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, (err)=>{
        if(err) throw err;
        console.log("Server started on port: "+ PORT);
    })
})
.catch((err)=>{
    console.log(err);
})
