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

export interface RetreiveChatData{
    status: number; 
    message: string ;
    chatId:mongoose.Types.ObjectId;

}

export interface IMessage extends Document {
    sender: UserData;
    message?: string;
    createdAt: Date;
}

export interface OldChatFormatted{
    userName:string;
    content:string;
    sentByUser:boolean;
}

export interface PollOption {
    name: string;
    votes: number;
  }
  
  export interface PollData {
    _id?: Types.ObjectId;         // Optional: generated by the backend
    userId?:string,
    question: string;     // Poll question
    options: PollOption[]; // Array of poll options
    totalVotes?: number;  // Optional: can be calculated on the backend
    submitted?: Types.ObjectId[];  // Optional: to indicate if poll is submitted
    createdBy?:string;

  }