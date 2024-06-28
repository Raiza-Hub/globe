
import { WeatherData } from "@/types/weather";
import { eye } from "../Icons";

interface visibilityProps {
    temp: WeatherData
}

const Visibility = ({ temp }: visibilityProps) => {

    const { visibility } = temp;

    const getVisibilityDescription = (visibility: number) => {
        const visibilityInKm = Math.round(visibility / 1000);

        if (visibilityInKm > 10) return "Excellent: Clear and vast view";
        if (visibilityInKm > 5) return "Good: Easily navigable";
        if (visibilityInKm > 2) return "Moderate: Some limitations";
        if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
        return "Unavailable: Visibility data not available";
    }


    return (
        <div className='pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{eye} Visibility</h2>
                <p className="pt-4 text-2xl">{Math.round(visibility / 1000)}km</p>
            </div>

            <p className='text-sm'>{getVisibilityDescription(visibility)}.</p>

        </div>
    );
}

export default Visibility;