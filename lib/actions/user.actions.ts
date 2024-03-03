'use server';
import { revalidatePath } from 'next/cache';
import User from '../models/user.models';
import { connectToDB } from '../mongoose';
type Params = {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
};
//adding or updating a user
export const updateUser = async ({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params) => {
    try {
        connectToDB();
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true } //if field is not there then add or if it is there then just update
        );
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
};
