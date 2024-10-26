import { StatusCode } from "../../interfaces/enum";
import { PostData } from "../../interfaces/interface"; // Ensure this is your PostData interface
import { PostRepository } from "../repository/postRepository"; // Adjust the import path as necessary

const postRepo = new PostRepository();

export class PostUseCase {
  
  // Method to add a new post
  public addPost = async (postData: PostData) => {
    try {
      // Save post to the database using the repository
      const savedPost = await postRepo.addPostToDatabase(postData);

      if (savedPost) {
        // If post is successfully saved, return a success response
        return { status: StatusCode.Created, message: "Post created successfully", data: savedPost };
      } else {
        // If post couldn't be saved, return an error response
        return { status: StatusCode.InternalServerError, message: "Failed to save post" };
      }
    } catch (error) {
      console.error('Error in PostUseCase - addPost:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while saving the post' };
    }
  };

  // Method to fetch all posts
  public fetchPosts = async () => {
    try {
      // Fetch posts from the database using the repository
      const fetchPostData = await postRepo.fetchPostData();

      if (fetchPostData) {
        // If posts are successfully fetched, return a success response
        return { status: StatusCode.OK, message: "Posts fetched successfully", data: fetchPostData };
      } else {
        // If posts couldn't be fetched, return an error response
        return { status: StatusCode.InternalServerError, message: "Failed to fetch posts" };
      }
    } catch (error) {
      console.error('Error in PostUseCase - fetchPosts:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while fetching the posts' };
    }
  };
}
