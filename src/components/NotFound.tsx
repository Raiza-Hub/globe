import { MapPinLine } from "@phosphor-icons/react/dist/ssr";



const NotFound = ({ searchTerm }: { searchTerm: string }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center px-4 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12'>
            <div className='flex flex-col items-center gap-4'>
                <MapPinLine size={32} />
                <p className='max-w-prose text-lg font-bold'>
                    Couldn&apos;t find the Country
                </p>
            </div>
            <div className='text-sm font-meduim text-gray-900 dark:text-white'>{`"${searchTerm}"`}</div>
        </div>
    )
}

export default NotFound;


