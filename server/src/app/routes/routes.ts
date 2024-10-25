import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import JwtControllers from '../../services/jwt';



const authController = new AuthControllers();
const jwtController = new JwtControllers();

// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);



export default route;