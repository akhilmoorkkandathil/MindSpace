import { PostModel } from "../../entities/post"; // Adjust the path as necessary
import { PostData } from "../../interfaces/interface"; // Adjust the path as necessary

export class PostRepository {
    
    // Method to add a post to the database
    public async addPostToDatabase(postData: PostData,imageUrl:String): Promise<PostData | null> {
        try {
            const postWithImage = { ...postData, image: imageUrl };

            const newPost = new PostModel(postWithImage); 
            const savedPost = await newPost.save();    // Save post to the database
            return savedPost;                          // Return saved post data
        } catch (error) {
            console.error('Error saving post to database:', error);
            return null;                               // Return null if saving fails
        }
    }

    public async getPostFromDatabaseById(postId: string): Promise<PostData | null> {
        try {
            // Find the post by ID in the database
            const post = await PostModel.findById(postId);
    
            if (post) {
                return post; // Return the post if found
            } else {
                return null; // Return null if the post is not found
            }
        } catch (error) {
            console.error('Error fetching post from database by ID:', error);
            return null; // Return null if an error occurs
        }
    }

    public async updatePostInDatabase(postId: string, updatedData: Partial<PostData>): Promise<PostData | null> {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(postId, updatedData, { new: true });
    
            if (updatedPost) {
                return updatedPost;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating post in database:', error);
            return null;
        }
    }
    
    
    public async fetchPostData(): Promise<PostData[] | null> {
        try {
            const postData = await PostModel.find();
            console.log("postData",postData);
            
            return postData;
        } catch (error) {
            console.error('Error fetching posts from database:', error);
            return null;
        }
    }

    // postRepository.ts
public async deletePostFromDatabase(postId: string): Promise<boolean> {
    try {
        const result = await PostModel.findByIdAndDelete(postId);
        return !!result; // Return true if post is deleted, false otherwise
    } catch (error) {
        console.error('Error deleting post from database:', error);
        return false;
    }
}



}
