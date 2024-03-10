import PostsCards from '@/components/cards/PostsCards';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async (id: string) => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarding) {
        redirect('/onboarding');
    }
    return (
        <section className="relative">
            <div className="text-white">post</div>
        </section>
    );
};

export default Page;
