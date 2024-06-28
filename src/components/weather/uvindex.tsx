import { sun } from "../Icons";
import { UvProgress } from "../UvProgress";

interface uvIndexProps {
    uvIndex: any
}

const UvIndex = ({ uvIndex }: uvIndexProps) => {

    const { daily } = uvIndex;
    const { uv_index_max } = daily;

    const uvIndexMax: number = uv_index_max[0]?.toFixed(0);

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex  <= 2) {
            return {
                text: "Low",
                description: "No protection required."
            };
        } else if (uvIndex  <= 5) {
            return {
                text: "Moderate",
                description: "Stay in shade near midday."
            };
        } else if (uvIndex  <= 7) {
            return {
                text: "High",
                description: "Wear a hat and sunglasses."
            };
        } else if (uvIndex  <= 10) {
            return {
                text: "High",
                description: "Apply sunscreen SPF 30+ every 2 hours."
            };
        } else {
            return {
                text: "Extreme",
                description: "Avoid being outside."
            };
        }
    };

    const marginLeftPercentage = (uvIndexMax / 14) * 100;


    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm">
            <div className="">
                <h2 className="flex items-center gap-2 font-medium">{sun}Uv Index</h2>
                <div className="pt-4 flex flex-col gap-1">
                    <p className="text-2xl">
                        {uvIndexMax}
                        <span className="text-sm">{`(${uvIndexCategory(uvIndexMax).text})`}</span>
                    </p>

                    <UvProgress
                        value={marginLeftPercentage}
                        max={14}
                        className='bg-[linear-gradient(90deg,rgba(58,110,180,1)0%,rgba(126,212,87,1)20%,rgba(248,212,73,1)40%,rgba(235,77,96,1)60%,rgba(180,96,231,1)80%,rgba(178,34,34,1)100%)]'
                    />
                </div>
            </div>

            <p className="text-sm">{uvIndexCategory(uvIndexMax).description}</p>

        </div>
    );
}

export default UvIndex;