"use client"

import { Button } from "@/components/ui/button"
import Image from "next/Image"

export default function ErrorBoundary({ error }: {
    error: Error
}) {
    return (
        <div className='w-full flex flex-col justify-center items-center px-4 mt-8 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12'>
            <div className='flex flex-col items-center gap-8'>
                <Image
                    src="https://img.freepik.com/premium-vector/world-map-with-countries-borders_47243-900.jpg?semt=ais_user"
                    alt={"The world map"}
                    width={300}
                    height={300}
                    className="w-62 h-62 mr-4 object-cover object-center"
                />
                <p className='max-w-prose text-lg font-bold'>
                    Something went wrong.
                </p>
            </div>
            <Button
            variant='link'
            className='pt-2 font-medium text-gray-700'
            onClick={() => {
                window.location.reload();
            }}
            >
                try again
            </Button>
        </div>
    )
}