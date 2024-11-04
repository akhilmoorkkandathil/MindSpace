import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import JwtControllers from '../../services/jwt';
import { PostController } from '../controllers/postController';
import upload from '../../utils/multerStorage';



const authController = new AuthControllers();
const jwtController = new JwtControllers();
const postController = new PostController()

// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);

route.post('/addPost',jwtController.isAuthenticated, upload.single('image'), postController.addPost);
route.post('/updatePost',jwtController.isAuthenticated, upload.single('image'), postController.updatePost);

route.get('/fetchPosts',jwtController.isAuthenticated, postController.fetchPosts);
route.get('/deletePost/:id',jwtController.isAuthenticated, postController.deletePost);



export default route;