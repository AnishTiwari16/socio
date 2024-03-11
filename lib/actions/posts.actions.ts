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
export const fetchPost = async (pageNumber = 1, pageSize = 20) => {
    try {
        const skipAmount = (pageNumber - 1) * pageSize;
        connectToDB();
        //we are fetching only top posts not the nesting / comments
        const postsQuery = Posts.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User })
            .populate({
                // this is for comments
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id name parentId image',
                },
            });
        const totalPostsCount = await Posts.countDocuments({
            parentId: { $in: [null, undefined] },
        }); // Get the total count of posts
        const posts = await postsQuery.exec();
        const isNext = totalPostsCount > skipAmount + posts.length;
        return { posts, isNext };
    } catch (error: any) {
        throw new Error(
            `Something went wrong while fetching post: ${error.message}`
        );
    }
};
export const fetchPostById = async (id: string) => {
    try {
        connectToDB();
        const post = await Posts.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: '_id id name image',
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image',
                    },
                    {
                        path: 'children',
                        model: Posts,
                        populate: {
                            path: 'author',
                            model: User,
                            select: '_id id image parentId name',
                        },
                    },
                ],
            })
            .exec();
        return post;
    } catch (error: any) {
        throw new Error(
            `Something went wrong while fetching post: ${error.message}`
        );
    }
};
//commenting on a post
export const commentOnPost = async (
    postId: string,
    commentedText: string,
    userId: string,
    path: string
) => {
    try {
        connectToDB();
        //we will fetch the original post by id
        const originalPost = await Posts.findById(postId);
        if (!originalPost) {
            throw new Error('Post not found');
        }
        //now create a new post wrt sub comment
        const commentedPost = new Posts({
            text: commentedText,
            author: userId,
            parentId: postId,
        });
        //save the new post
        const savedNewPost = await commentedPost.save();
        //now we will append the new commented post into original post as the commented will be children of original as it is a comment
        originalPost.children.push(savedNewPost._id);
        await originalPost.save();
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(
            `Something went wrong while commenting on post: ${error.message}`
        );
    }
};
