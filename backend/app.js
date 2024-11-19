import express from "express";
import {config} from "dotenv";
import cors from "cors"
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import {dbconnection} from "./database/dbconnection.js";
import messageRouter from "./router/messageRouter.js";
import{errorMiddleware}from "./middleware/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
const app=express();
config({path:"./config/config.env"});


app.use(cors({

    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    METHODS:["GET","POST","PUT","DELETE"],
    credentials:true,

}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment", appointmentRouter);
dbconnection();
app.use(errorMiddleware);
export default app;