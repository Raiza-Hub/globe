"use client"

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link";

export default function ErrorBoundary({ error }: { error: Error }) {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOffline(!navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        <div className='w-full flex flex-col justify-center items-center px-4 mt-8 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12'>
            <div className='flex flex-col items-center gap-8'>
                <Image
                    src={isOffline ? "/No connection-bro.svg" : "/not-found.svg"}
                    alt={"The world map"}
                    width={300}
                    height={300}
                    className="w-62 h-62 mr-4 object-cover object-center"
                />
                <h1 className='max-w-prose text-2xl font-bold'>
                    {isOffline ? "No internet connection." : "Page not Found."}
                </h1>
                <p className='hidden'>{error.message}</p>
            </div>
            {isOffline ? (
                <Button
                    variant='link'
                    className='pt-2 font-medium text-gray-700 dark:text-white text-lg'
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    try again
                </Button>
            ) : (
                <Link
                    href='/'
                    className={buttonVariants({
                        variant: 'link',
                        className: 'pt-2 font-medium text-gray-700 dark:text-white text-lg'
                    })}
                >
                    Back to homepage
                </Link>
            )}
        </div>
    )
}
