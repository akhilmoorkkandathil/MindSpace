import { Application } from "express";
import express from "express";
import http from 'http'
import cors from 'cors'
import connectToDatabase from './config/connectDb';
import route from "./app/routes/routes";
import corsOptions from "./config/cors";
import dotenv from 'dotenv';
dotenv.config();



class App{
    public app:Application;
    server:http.Server<typeof http.IncomingMessage,typeof http.ServerResponse>

    constructor(){
        this.app=express()
        this.server=http.createServer(this.app)
        this.applyMiddleware()
        this.routes()
        connectToDatabase()
    }

    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.options('*', cors(corsOptions));
        this.app.use(
          cors(corsOptions)
        );
    }

    private routes():void{
        this.app.use('/api/v1',route);
    }

    public startServer(PORT:number):void{
        this.server.listen(PORT,()=>{
            console.log(`server is running  http://localhost:${PORT}`);
            
        })
    }

}
export default App