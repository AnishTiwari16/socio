import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

const OnBoarding = async () => {
    const user = await currentUser();
    if (!user) {
        return null; // for avoiding typescript warnings
    }
    const userData = {
        id: user.id,
        profile_photo: user.imageUrl,
        name: user.firstName ?? '',
        username: user.username ?? '',
    };
    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile now, to use Socio.
            </p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    );
};

export default OnBoarding;
