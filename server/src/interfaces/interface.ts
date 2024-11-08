import mongoose,{ Types ,Document, ObjectId} from 'mongoose';
import { Socket } from 'socket.io';

export interface UserInterface{
    userName: string;
    email: string;
    password: string;
    otp?:string
}
export interface UserData{
    _id:Types.ObjectId
    userName: string;
    email: string;
    password: string;
    profilePhoto?: string;
}
export interface LoginResponse{
    data:Data
}

export interface Data{
    user:UserData
    refreshToken:string
    accessToken:string
}

export interface StatusMessage{
    status: number; 
    message: string ;
    data?:any;
}

export interface DecodedToken {
    userId: string;
}

export interface AuthenticatedSocket extends Socket {
    decoded?: DecodedToken;
}


export interface PostData extends Document {
    title: string;
    content: string;
    image: string;
    userId: Types.ObjectId;  // Changed to Types.ObjectId
}