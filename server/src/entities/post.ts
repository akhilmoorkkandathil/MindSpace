import { Schema, Types, model } from "mongoose";

export interface PostData extends Document {
    title: string;
    content: string;
    image: string;
    userId: Types.ObjectId;
}

// Mongoose Schema for PostData
const PostSchema = new Schema<PostData>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false }, // Optional if some posts may not have images
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Mongoose Model
export const PostModel = model<PostData>('Post', PostSchema);
