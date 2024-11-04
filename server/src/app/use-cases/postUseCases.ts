import { UploadApiResponse } from "cloudinary";
import { StatusCode } from "../../interfaces/enum";
import { PostData } from "../../interfaces/interface"; // Ensure this is your PostData interface
import { PostRepository } from "../repository/postRepository"; // Adjust the import path as necessary

const postRepo = new PostRepository();

export class PostUseCase {
  
  // Method to add a new post
  public addPost = async (postData: PostData,imageUrl:String) => {
    try {
      // Save post to the database using the repository
      const savedPost = await postRepo.addPostToDatabase(postData,imageUrl);

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

  public getPostById = async (postId: string) => {
    try {
      // Fetch post from the database using the repository
      const post = await postRepo.getPostFromDatabaseById(postId);
  
      if (post) {
        // If post is found, return a success response with the post data
        return { status: StatusCode.OK, message: "Post fetched successfully", data: post };
      } else {
        // If post is not found, return a 404 error response
        return { status: StatusCode.NotFound, message: "Post not found" };
      }
    } catch (error) {
      console.error('Error in PostUseCase - getPostById:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while fetching the post' };
    }
  };
  
  public updatePost = async (postId: string, updatedData: Partial<PostData>) => {
    try {
      // Update the post in the database
      const updatedPost = await postRepo.updatePostInDatabase(postId, updatedData);
  
      if (updatedPost) {
        // If post is successfully updated, return a success response
        return { status: StatusCode.OK, message: "Post updated successfully", data: updatedPost };
      } else {
        // If the post couldn't be updated, return a 404 or error response
        return { status: StatusCode.NotFound, message: "Post not found or update failed" };
      }
    } catch (error) {
      console.error('Error in PostUseCase - updatePost:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while updating the post' };
    }
  };

  // postUsecase.ts
public async deletePost(postId: string) {
  try {
      const deletedPost = await postRepo.deletePostFromDatabase(postId);

      if (deletedPost) {
          return { status: StatusCode.OK, message: 'Post deleted successfully' };
      } else {
          return { status: StatusCode.NotFound, message: 'Post not found' };
      }
  } catch (error) {
      console.error('Error in PostUseCase - deletePost:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while deleting the post' };
  }
}

  

}
