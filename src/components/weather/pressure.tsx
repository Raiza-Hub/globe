
import { WeatherData } from "@/types/weather";
import { gauge } from "../Icons";

interface pressureProps {
    temp: WeatherData
}

const Pressure = ({ temp }: pressureProps) => {

    const { pressure } = temp.main;

    const getPressureText = (pressure: number) => {
        
        if (pressure < 1000) return "Very low pressure";
        if (pressure >= 1000 && pressure < 1015) return "Low pressure. Expect weather changes.";
        if (pressure >= 1015 && pressure < 1025) return "Normal pressure. Expect weather changes.";
        if (pressure >= 1025 && pressure < 1040) return "High pressure. Expect weather changes.";
        if (pressure >= 1040) return "Very high pressure. Expect weather changes.";
        return "Unavailable pressure data";
    };



    return (
        <div className='pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm'>
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{gauge} Pressure</h2>
                <p className="pt-4 text-2xl">{pressure}pa</p>
            </div>

            <p className='text-sm'>{getPressureText(pressure)}</p>

        </div>
    );
}

export default Pressure;