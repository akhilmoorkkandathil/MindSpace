import { Request, Response } from "express"; // Ensure you have the correct imports for Request and Response
import { errorResponse, successResponse } from "../../utils/response"; // Adjust the path as necessary
import { PostUseCase } from "../use-cases/postUseCases"; // Adjust the import path as necessary
import { errorWrapper } from "../../utils/errorWrapper"; // Make sure you have your error wrapper utility
import { StatusCode } from "../../interfaces/enum";

const postUsecase = new PostUseCase();

export class PostController {

    // Method to add a new post
    public addPost = errorWrapper(async (req: Request, res: Response) => {
        console.log("req.body in addPost in postController",req.body);
        
        const addPostResponse = await postUsecase.addPost(req.body);

        // If the post couldn't be saved, return an error response
        if (addPostResponse.status !== StatusCode.Created) {
            return await errorResponse(addPostResponse.status, addPostResponse, res);
        }

        // Return success response if post is saved
        await successResponse(addPostResponse.status, addPostResponse, res);
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
}
