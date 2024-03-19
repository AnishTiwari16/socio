import PostsCards from '@/components/cards/PostsCards';
import Comment from '@/components/forms/Comment';
import { fetchPostById } from '@/lib/actions/posts.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarding) {
        redirect('/onboarding');
    }
    const post = await fetchPostById(params.id);
    return (
        <section className="relative">
            <div>
                <PostsCards
                    id={post._id}
                    currentUserId={user.id}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                />
            </div>
            <div className="mt-7">
                <Comment
                    postId={params.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10">
                {post.children.map((childItem: any) => (
                    <PostsCards
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={user.id}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    );
};

export default Page;
