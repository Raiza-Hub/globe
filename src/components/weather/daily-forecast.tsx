import { Forecast } from "@/types/forecast";
import { WeatherData } from "@/types/weather";
import { 
    drizzleIcon, 
    rain, 
    snow, 
    clearSky, 
    cloudy, 
    thunderStormIcon,
    HazeIcon 
} from "../Icons";
import { 
    Carousel,
    CarouselContent, 
    CarouselItem 
} from "../ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "@/lib/misc";

interface DailyForecastProps {
    forecast: Forecast
    temp: WeatherData
}

const DailyForecast = ({ forecast, temp }: DailyForecastProps) => {

    const {  list } = forecast
    const {  weather } = temp;

    const today = new Date;
    const todayString = today.toISOString().split("T")[0]

    const todaysForecast = list.filter((forecast: { dt_txt: string; main: { temp: number } }) => {
        return forecast.dt_txt.startsWith(todayString)
    })

    const { main: weatherMain } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case 'Drizzle':
                return drizzleIcon;
            case 'Rain':
                return rain;
            case 'Snow':
                return snow;
            case 'Clear':
                return clearSky;
            case 'Clouds':
                return cloudy;
            case 'Thunderstorm':
                return thunderStormIcon;
            case 'Mist':
                return HazeIcon;
            default:
                return clearSky
        }
    };

    return (
        <div className='col-span-full sm-[581px]:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="h-full flex gap-1 overflow-hidden">
                {todaysForecast.length < 1 ? (
                    <div className='flex items-center justify-center'>
                        <h1 className="text-2xl line-through text-rose-500">
                            No Data Available
                        </h1>
                    </div>
                ) : (
                    <div className="w-full cursor-grabbing select-none">
                        <Carousel>
                            <CarouselContent>
                                {todaysForecast.map(
                                    (forecast: { dt_txt: string; main: { temp: number } }) => (
                                        <CarouselItem key={forecast.dt_txt}
                                            className='flex flex-col gap-4 basis-[8.5rem]'
                                        >
                                            <p className="text-grey-300">
                                                {moment(forecast.dt_txt).format("HH:mm")}
                                            </p>
                                            <p>{getIcon()}</p>
                                            <p className="mt-4">{kelvinToCelsius(forecast.main.temp)}°C</p>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}</div>
        </div>
    );
}

export default DailyForecast;
