import { createClient } from 'redis'; 
import { UserInterface } from '../interfaces/interface';

const client = createClient({url: 'redis://localhost:6379' });

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});
client.connect().catch(console.error);
export const otpSetData=async(data:UserInterface,otp:string)=>{
    try {
        const userData = {
            userName: data.userName,
            email: data.email,
            password: data.password,
            otp: otp
        };
    console.log("seting user data in otpSet in redis",userData);
    
        await Promise.all([
            client.hSet(`user:${data.email}`, userData),
            client.expire(`user:${data.email}`, 300) 
        ]);
        console.log("data setted");
        
        
    } catch (error) {
        console.log(error);
        
    }

}

 
export const getUserData= async(email: string): Promise<UserInterface | null> =>{
    try {
        console.log("Getting user date in redis getUserData",email);
        const userData = await client.hGetAll(`user:${email}`);
        console.log("Getting user date in redis getUserData",userData);
        
        if (Object.keys(userData).length === 0) {
            return null; 
        }
        const user: UserInterface = {
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
            otp: userData.otp || ''
        };
        return user;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
}


