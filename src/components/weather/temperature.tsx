'use client'

import { kelvinToCelsius } from "@/lib/misc";
import { WeatherData } from "@/types/weather";
import {
    clearSky,
    cloudy,
    drizzleIcon,
    navigation,
    rain,
    snow,
    thunderStormIcon,
    HazeIcon
} from "../Icons";
import { useEffect, useState } from "react";
import moment from 'moment'

interface temperatureProps {
    temp: WeatherData
}

const Temperature = ({ temp }: temperatureProps) => {

    const [currentDay, setCurrentDay] = useState<string | null>(null)
    const [localTime, setLocalTime] = useState<string | null>(null)

    const { main, timezone, weather, name } = temp;

    const celsius = kelvinToCelsius(main?.temp);
    const minCelsius = kelvinToCelsius(main?.temp_min);
    const maxCelsius = kelvinToCelsius(main?.temp_max);



    const { main: weatherMain, description } = weather[0];

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


    useEffect(() => {
        setInterval(() => {

            // moment.locale('it')
            const localMoment = moment().utcOffset(timezone / 60);

            const formattedTime = localMoment.format("LTS");

            const day = localMoment.format('dddd')

            setLocalTime(formattedTime)
            setCurrentDay(day)
        })
    }, [timezone])

    return (
        <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between shadow-sm">
            <p className='flex justify-between items-center'>
                <span className='font-medium'>{currentDay}</span>
                <span className='font-medium'>{localTime}</span>
            </p>
            <p className='py-4 font-bold flex gap-1'>
                <span>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className='py-10 text-9xl font-bold self-center'>{celsius}°</p>

            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                </div>
                <p className='flex items-center gap-2 text-sm'>
                    <span>Low: {minCelsius}°</span>
                    <span>High: {maxCelsius}°</span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;