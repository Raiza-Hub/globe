import { thermometer } from "../Icons";
import { WeatherData } from "@/types/weather";
import { kelvinToCelsius } from "@/lib/misc";

interface FeelsLikeProps {
    temp: WeatherData
}

const FeelsLike = ({ temp }: FeelsLikeProps) => {
    
    const { feels_like, temp_min, temp_max } = temp.main;

    const feelsLikeText = (
        feelsLike: number,
        minTemp: number,
        maxTemp: number
    ) => {
        const avgTemp = (minTemp + maxTemp) / 2

        if (feelsLike < avgTemp - 5) {
            return "Feels significantly colder than actual temperature";
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to the actual temperature";
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than actual temperature";
        }
        return "Temperature feeling is typical for this range";
    }

    const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

    return (
        <div className='pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{thermometer} Feels Like</h2>
                <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
            </div>

            <p className='text-sm'>{feelsLikeDescription}.</p>

        </div>
    );
}

export default FeelsLike;