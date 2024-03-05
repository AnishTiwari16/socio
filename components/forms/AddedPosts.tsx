'use client';
import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { PostsValidation } from '@/lib/validations/posts';
import { createPost } from '@/lib/actions/posts.actions';
import { usePathname, useRouter } from 'next/navigation';
const AddedPosts = ({ userId }: { userId: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const form = useForm<z.infer<typeof PostsValidation>>({
        resolver: zodResolver(PostsValidation),
        defaultValues: {
            post: '',
            accountId: userId,
        },
    });
    const onSubmit = async (values: z.infer<typeof PostsValidation>) => {
        await createPost({
            text: values.post,
            author: userId,
            path: pathname,
        });
        router.push('/');
    };
    return (
        <Form {...form}>
            <form
                className="mt-10 flex flex-col justify-start gap-10"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea rows={15} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">
                    Post
                </Button>
            </form>
        </Form>
    );
};

export default AddedPosts;
