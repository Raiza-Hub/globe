import { AirQuality } from "@/types/weather";
import { airQualityIndexText } from "@/lib/misc";
import { Progress } from "../ui/progress";
import { thermo } from "../Icons";

interface AirPollutionProps {
    airQuality: AirQuality
}


const AirPollution = ({ airQuality }: AirPollutionProps) => {

    

    const airQualityIndex = airQuality?.list[0]?.main?.aqi * Number(20);

    const filterIndex = airQualityIndexText.find(item => {
        return item.rating === airQualityIndex;
    })

    

    return (
        <div className="col-span-full sm-[581px]:col-span-2  pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm">
            <h2 className="flex items-center gap-2 font-medium">{thermo}Air pollusion</h2>
            <Progress
                value={airQualityIndex}
                max={100}
                className="bg-[linear-gradient(90deg,rgba(58,110,180,1)0%,rgba(126,212,87,1)20%,rgba(248,212,73,1)40%,rgba(235,77,96,1)60%,rgba(180,96,231,1)80%,rgba(178,34,34,1)100%)]"

            />
            <p>Air quality is {filterIndex?.description}.</p>
        </div>
    );
}

export default AirPollution;