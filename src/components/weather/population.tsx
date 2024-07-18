import { people } from "../Icons";
import { Forecast } from "@/types/forecast";
import { formatNumber } from "@/lib/misc";

interface populationProps {
    forecast: Forecast
}

const Population = ({ forecast }: populationProps) => {
    const { city } = forecast;
    
    return ( 
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm">
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{people} Population</h2>
                <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
            </div>
            <p className='text-sm'>Latest UN population data for {city.name}.</p>
        </div>
     );
}
 
export default Population;