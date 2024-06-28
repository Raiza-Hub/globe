import { unixToTime } from "@/lib/misc";
import { sunsetIcon } from "../Icons";
import { Sys } from "@/types/weather";


interface sunsetProps {
    sunset: Sys
    timezone: number
}

 
const Sunset = ({ sunset, timezone }: sunsetProps) => {


    const times = sunset?.sunset

    const sunsetTime = unixToTime(times, timezone);
    const sunriseTime = unixToTime(sunset?.sunrise, timezone)

    return (
        <div className='pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{sunsetIcon}Sunset</h2>
                <p className="pt-4 text-2xl">{sunsetTime}</p>
            </div>

            <p className='text-sm'>Sunrise: {sunriseTime}</p>

        </div>
    );
}

export default Sunset; 