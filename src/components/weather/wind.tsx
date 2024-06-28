import { Wind as windType } from "@/types/weather";
import { windIcon } from "../Icons";
import Image from "next/image"

interface windProps {
    wind: windType
}

const Wind = ({ wind }: windProps) => {

    const windSpeed = wind?.speed;
    const windDir = wind?.deg;

    return ( 
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-3 shadow-sm">
            <h2 className="flex items-center gap-2 font-medium">{windIcon} Wind</h2>

            <div className='relative flex items-center justify-center'>
                <div className="image relative">
                    <Image 
                    src="/compassBody.svg" 
                    alt="compass body"
                    width={110}
                    height={110}
                    />
                    <Image 
                    src="/compassArrow.svg" 
                    alt="compass arrow"
                    className='absolute top-0 left-[50%] transition-all duration-500 ease-in-out'
                    style={{
                        transform: `rotate(${windDir}deg) translateX(-50%)`,
                        height: "100%"
                    }}
                    width={11}
                    height={11}
                    />
                </div>
                <p className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>{Math.round(windSpeed)} m/s</p>
            </div>
        </div>
     );
}
 
export default Wind;