import Image from "next/Image"


const NotFound = ({ searchTerm }: { searchTerm: string }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center px-4 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12'>
            <div className='flex flex-col items-center gap-4'>
                <Image
                    src="https://img.freepik.com/premium-vector/world-map-with-countries-borders_47243-900.jpg?semt=ais_user"
                    alt={"The world map"}
                    width={300}
                    height={300}
                    className="w-62 h-62 mr-4 object-cover object-center"
                />
                <p className='max-w-prose text-lg font-bold'>
                Couldn&apos;t find the Country
                </p>
            </div>
            <div className='text-sm font-meduim text-gray-900'>{`"${searchTerm}"`}</div>
        </div>
    )
}

export default NotFound;


