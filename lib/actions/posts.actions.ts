'use server';
import { revalidatePath } from 'next/cache';
import Posts from '../models/posts.models';
import User from '../models/user.models';
import { connectToDB } from '../mongoose';
type params = {
    text: string;
    author: string;
    path: string;
};
export const createPost = async ({ text, author, path }: params) => {
    try {
        connectToDB();
        //creating a post
        const createdPost = await Posts.create({ text, author, path });
        //now we will update the post in user
        await User.findByIdAndUpdate(author, {
            $push: { posts: createdPost._id },
        });
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(
            `Something went wrong while creating post: ${error.message}`
        );
    }
};
