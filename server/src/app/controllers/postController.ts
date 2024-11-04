import { Request, Response } from "express"; // Ensure you have the correct imports for Request and Response
import { errorResponse, successResponse } from "../../utils/response"; // Adjust the path as necessary
import { PostUseCase } from "../use-cases/postUseCases"; // Adjust the import path as necessary
import { errorWrapper } from "../../utils/errorWrapper"; // Make sure you have your error wrapper utility
import { StatusCode } from "../../interfaces/enum";
import cloudinary from "../../utils/coudinary";

const postUsecase = new PostUseCase();

export class PostController {

    // Method to add a new post
    public addPost = errorWrapper(async (req: Request, res: Response) => {
        console.log("req.body in addPost in postController",req.body);
        console.log("const image = req.file.path;",req.file?.path);
        if (!req.file || !req.file.path) {
            return await errorResponse(400, {status:400,message:'Image file is required.'}, res);
        }
        const result = await cloudinary.uploader.upload(req.file?.path);
        const addPostResponse = await postUsecase.addPost(req.body,result.secure_url);

        // If the post couldn't be saved, return an error response
        if (addPostResponse.status !== StatusCode.Created) {
            return await errorResponse(addPostResponse.status, addPostResponse, res);
        }

        // Return success response if post is saved
        await successResponse(addPostResponse.status, addPostResponse, res);
    });

    public updatePost = errorWrapper(async (req: Request, res: Response) => {
        const postId = req.body.postId; // Get the post ID from the URL parameters
        console.log("Updating post ID:", postId);
        console.log("req.body in updatePost in postController", req.body);
    
        // Check if the post exists
        const existingPost = await postUsecase.getPostById(postId);
        if (!existingPost) {
            return await errorResponse(404, { status: 404, message: 'Post not found.' }, res);
        }
    
        let imageUrl: string | undefined;
    
        // If an image file is provided, upload it to Cloudinary
        if (req.file && req.file.path) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Get the secure URL of the uploaded image
        } else {
            // If no new image is uploaded, use the existing image URL
            imageUrl = existingPost.data?.image; // Assuming `imageUrl` is the property name for the image in your post
        }
    
        // Prepare the updated post data
        const updatedPostData = {
            title: req.body.title,
            content: req.body.content,
            imageUrl, // Use the new image URL or existing one
        };
    
        const updatePostResponse = await postUsecase.updatePost(postId, updatedPostData);
    
        // If the post couldn't be updated, return an error response
        if (updatePostResponse.status !== StatusCode.OK) {
            return await errorResponse(updatePostResponse.status, updatePostResponse, res);
        }
    
        // Return success response if post is updated
        await successResponse(updatePostResponse.status, updatePostResponse, res);
    });

    // Method to fetch posts
    public fetchPosts = errorWrapper(async (req: Request, res: Response) => {
        const fetchPostsResponse = await postUsecase.fetchPosts();

        // If posts couldn't be fetched, return an error response
        if (fetchPostsResponse.status !== StatusCode.OK) {
            return await errorResponse(fetchPostsResponse.status, fetchPostsResponse, res);
        }

        // Return success response if posts are fetched successfully
        await successResponse(fetchPostsResponse.status, fetchPostsResponse, res);
    });


    public deletePost = errorWrapper(async (req: Request, res: Response) => {

        const postId = req.params.id;

        const deleteResponse = await postUsecase.deletePost(postId);

            if (deleteResponse.status !== StatusCode.OK) {
                return await errorResponse(deleteResponse.status, deleteResponse, res);
            }

            await successResponse(deleteResponse.status, deleteResponse, res);
    });

}
