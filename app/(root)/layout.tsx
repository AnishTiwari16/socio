import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Topbar from '@/components/layout/Topbar';
import LeftSideBar from '@/components/layout/LeftSideBar';
import BottomBar from '@/components/layout/BottomBar';
import RightSideBar from '@/components/layout/RightSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Socio',
    description: 'Social media for stalkers',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body className={inter.className}>
                    <Topbar />
                    <main className="flex flex-row">
                        <LeftSideBar />

                        <section className="main-container">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        {/* @ts-ignore */}
                        <RightSideBar />
                    </main>{' '}
                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    );
}
