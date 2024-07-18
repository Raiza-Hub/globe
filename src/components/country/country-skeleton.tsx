
const CountrySkeleton = () => {
    return (
        <div className="relative animate-pulse">
            <div  className="w-full flex flex-col justify-center px-2 md:px-4 border rounded">
                <div className="flex justify-between items-center border-b border-gray-200 py-1">
                    <div className="bg-gray-200 dark:bg-white/30 backdrop-blur-lg h-5 w-36" />
                    <div className="bg-gray-200 dark:bg-white/30 backdrop-blur-lg w-20 h-9" />
                </div>

                <div className="grid grid-cols-1  py-4">
                    <div className=" flex flex-col bg-gray-200 dark:bg-white/30 backdrop-blur-lg h-24 w-full" />      
                </div>

            </div>
        </div>
    )
} 

export default CountrySkeleton