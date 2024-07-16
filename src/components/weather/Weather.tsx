import { dailyUvIndex, getAirPollution, getDailyForecast, getWeather } from "@/action/weather";
import { notFound } from "next/navigation";
import AirPollution from "./air-pollution";
import DailyForecast from "./daily-forecast";
import FeelsLike from "./feels-like";
import FiveDayForecast from "./fiveday-forecast";
import Humidity from "./humidity";
import MapBox from "./mapbox";
import Population from "./population";
import Pressure from "./pressure";
import Temperature from "./temperature";
import UvIndex from "./uvindex";
import Visibility from "./visibility";
import { getCountry } from "@/action/countries";
import { Country } from "@/types/countries";
import Sunset from "./sunset";
import Wind from "./wind";


interface countryInfoProps {
    countriesId: string
}

const Weather = async ({ countriesId }: countryInfoProps) => {

    const country: Country[] = await getCountry(countriesId);

    const latlonArray: number[] = [];

    const coords = country?.forEach(country => {
        country.capitalInfo.latlng.forEach(coords => {
            latlonArray.push(coords);
        });
    });

    const [lat, lon] = latlonArray;

    const weatherData = await getWeather(lat, lon);
    const airQuality = await getAirPollution(lat, lon);
    const forecast = await getDailyForecast(lat, lon);
    const uvIndex = await dailyUvIndex(lat, lon);

    if (!weatherData || !airQuality || !forecast || !uvIndex) return notFound();

    return (
        <div className="">
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="w-full h-fit lg:h-full flex flex-col gap-4 min-w-72 md:w-[35rem]">
                    <Temperature temp={weatherData} />
                    <FiveDayForecast forecast={forecast} />
                </div>
                <div className="w-full flex flex-col">
                    <div className="grid h-full gap-6 sm-[581px]:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AirPollution airQuality={airQuality} />
                        <Sunset sunset={weatherData.sys} timezone={weatherData.timezone} />
                        <Wind wind={weatherData.wind} />
                        <DailyForecast forecast={forecast} temp={weatherData} />
                        <UvIndex uvIndex={uvIndex} />
                        <Population forecast={forecast} />
                        <FeelsLike temp={weatherData} />
                        <Humidity temp={weatherData} />
                        <Visibility temp={weatherData} />
                        <Pressure temp={weatherData} />
                    </div>
                    <div className='flex mt-4'>
                        <MapBox forecast={weatherData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;