"use client"

import { Country, Currencies } from "@/types/countries";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image"


const Countries = ({ country }: { country: Country }) => {


    function renderCurrencies(currencies: Currencies) {
        if (!currencies) {
            return <p>None</p>;
        }

        return (
            <div>
                {country.currencies && Object.entries(currencies).map(([currencyCode, currency]) => (
                    <div key={currencyCode}>
                        <p> {currency.symbol}{" "}{currency.name}{" "}{`(${currencyCode})`}</p>
                    </div>
                ))}
            </div>
        );
    }


    const currencyElements = renderCurrencies(country.currencies);



    return (
        <div className="group relative">
            <div key={country.cca2} className="w-full flex flex-col justify-center md:px-2 border rounded-sm">
                <div className="flex justify-between items-center border-b border-gray-200 py-1">
                    <Link
                        href={`/countries/${country.name.common}`}
                        className={buttonVariants({
                            variant: "link"
                        })}>
                        <h2 className="w-40 xl:w-48 text-lg font-semibold truncate">
                            {country.name.common}
                        </h2>
                    </Link>

                    <Image
                        src={country.flags.svg}
                        alt={country.flags.alt ?? country.name.official}
                        className="w-16 h-8 mr-4 object-cover object-center group-hover:opacity-75"
                        width={64}
                        height={32}
                        quality={100}
                    />

                </div>

                <div className="grid grid-cols-1 space-y-4 my-6">

                    <div className="grid grid-cols-2 mx-4 gap-x-2">
                        <div className="flex flex-col border py-2 space-y-1">
                            <p className="text-gray-900 dark:text-white font-medium ml-2">Population:</p>
                            <p className="text-center text-gray-700 dark:text-white">{country.population.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col border py-2 space-y-1">
                            <p className="text-gray-900 dark:text-white font-medium ml-2">Capital:</p>
                            <p className="text-center text-gray-700 dark:text-white truncate">{country.capital?.[0] ?? 'None'}</p>
                        </div>
                    </div>

                    <div className=" flex flex-col mx-4 py-2 space-y-1 border">
                        <p className="text-gray-900 dark:text-white font-medium ml-2">Currency:</p>
                        <div className="text-center text-gray-700 dark:text-white truncate">
                            {currencyElements}
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default Countries;


