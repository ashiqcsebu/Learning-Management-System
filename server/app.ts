require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors({origin:process.env.ORIGIN}));

app.get('/test',(req:Request, res:Response , next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"Api is working"
    })
})




