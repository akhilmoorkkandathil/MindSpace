import { PostModel } from "../../entities/post"; // Adjust the path as necessary
import { PostData } from "../../interfaces/interface"; // Adjust the path as necessary

export class PostRepository {
    
    // Method to add a post to the database
    public async addPostToDatabase(postData: PostData): Promise<PostData | null> {
        try {
            console.log("postData in PostRepository", postData);

            const newPost = new PostModel(postData);   // Create a new PostModel object
            const savedPost = await newPost.save();    // Save post to the database
            return savedPost;                          // Return saved post data
        } catch (error) {
            console.error('Error saving post to database:', error);
            return null;                               // Return null if saving fails
        }
    }

    // Method to fetch all posts from the database
    public async fetchPostData(): Promise<PostData[] | null> {
        try {
            const postData = await PostModel.find();   // Fetch all posts
            return postData;
        } catch (error) {
            console.error('Error fetching posts from database:', error);
            return null;                               // Return null if fetching fails
        }
    }
}
