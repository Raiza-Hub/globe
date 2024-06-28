import { WeatherData } from "@/types/weather";
import { droplets } from "../Icons";

interface humidityProps {
    temp: WeatherData
}

const Humidity = ({ temp }: humidityProps) => {

    const { humidity } = temp.main

    const getHumidityText = (humidity: number) => {
        if (humidity < 30) return "Dry: May cause skin irritation.";
        if (humidity >= 30 && humidity < 50) return "Comfortable: Ideal for health and comfort.";
        if (humidity >= 50 && humidity < 70) return "Moderate: Sticky, may increase allergens.";
        if (humidity >= 70) return "High: Uncomfortable, mold growth risk.";
        return "Unavailable: Humidity data not available.";
    }

    return (
        <div className='pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{droplets} Humdity</h2>
                <p className="pt-4 text-2xl">{humidity}%</p>
            </div>

            <p className='text-sm'>{getHumidityText(humidity)}</p>

        </div>
    );
}

export default Humidity;