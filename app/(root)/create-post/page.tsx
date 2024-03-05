import AddedPosts from '@/components/forms/AddedPosts';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <>
            <h1 className="head-text text-left">Create Posts</h1>
            <AddedPosts userId={userInfo._id} />
        </>
    );
};

export default Page;
