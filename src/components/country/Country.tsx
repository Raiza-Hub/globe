import Image from "next/image"
import {
    Barricade,
    CalendarDots,
    CastleTurret,
    Compass,
    Flag,
    MapPinArea,
    Planet,
    SealCheck,
    UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import Currency from "../Currency";
import { Languages } from "@/types/countries";
import { getCountry } from "@/action/countries";
import { Country } from "@/types/countries";
import { countryNames } from "@/lib/country-names";
import { notFound } from "next/navigation";




interface countryInfoProps {
    countriesId: string
}


const CountryInfo = async ({ countriesId }: countryInfoProps) => {

    const country: Country[] = await getCountry(countriesId);

    if(!country) return notFound();

    const getFullCountryNames = (countryCodes: string[]): string => {
        return countryCodes?.map(code => countryNames[code]).join(", ");
    };

    const coords = (coords: string[]) => {
        return coords?.map(coord => coord);
    };

    const renderLanguages = (languages: Languages) => {
        if (!languages) {
            return <p>None</p>
        }

        return (
            <div>
                {Object.entries(languages).map(([languageCode, language]) => (
                    <div key={languageCode}>
                        <p className="py-1">{language}</p>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <>
            <div className="mt-4">
                {country?.map(main => (
                    <div key={main.cca2} className="flex items-center">
                        <Image
                            src={main.flags.svg}
                            alt={main.flags.alt ?? main.name.official}
                            className="w-16 h-10 mr-4 object-cover object-center"
                            width={150}
                            height={100}
                            quality={100}
                        />
                        <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-4xl text-gray-900 dark:text-white">{main.name.official}</h1>
                    </div>
                ))}
            </div>

            <section className="mt-4">
                {country?.map(main => (
                    <div key={main.cca2} className="flex flex-col">
                        <div className="flex">
                            <p className='font-medium text-gray-900 dark:text-white'>
                                {main.region}
                            </p>

                            <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                                {main.subregion}
                            </div>
                        </div>

                        <div className="mt-6 flex items-center">
                            <SealCheck
                                aria-hidden="true"
                                className="size-5 flex-shrink-0 text-green-500"
                            />
                            <p className="ml-2 text-sm text-muted-foreground dark:text-white">
                                {main.status}
                            </p>
                        </div>

                    </div>
                ))}
            </section>

            <div className='w-full flex mt-4'>
                {country?.map(main => (
                    <div key={main.cca2} className="w-full flex justify-end gap-4">
                        <div className="flex py-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex justify-center font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:text-gray-900 border px-4 py-1 rounded-sm">
                                    Timezone
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {main.timezones.map((time, i) => (
                                        <div className="text-left w-full  px-4 py-2 text-sm text-muted-foreground dark:text-white" key={i}>
                                            {time}
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>


                        <div className="flex py-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex justify-center font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:text-gray-900 border px-4 py-1 rounded-sm">
                                    Language
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <div className="text-left w-full block px-4 py-2 text-sm text-muted-foreground dark:text-white">
                                        {renderLanguages(main.languages)}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}

            </div>

            <div className="mt-10">
                {country?.map(main => (
                    <div key={main.cca2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                            <div className="flex flex-col border rounded-sm py-2 space-y-1">
                                <div className="flex items-center">
                                    <UsersThree className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                    <p className="font-medium text-gray-900 dark:text-white">Population:</p>
                                </div>
                                <p className="text-center">{main.population.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col border rounded-sm py-2 space-y-1">
                                <div className="flex items-center">
                                    <Compass className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                    <p className="font-medium text-gray-900 dark:text-white">Area:</p>
                                </div>
                                <p className="text-center">
                                    {main.area.toLocaleString()}{" "}km
                                    <sup>2</sup>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col border rounded-sm py-2 space-y-1">
                            <div className="flex items-center">
                                {/* <CastleTurret className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' /> */}
                                <MapPinArea  className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                <p className="font-medium text-gray-900 dark:text-white">Capital:</p>
                            </div>

                            <div className="flex justify-center gap-x-4">
                                {main.capital?.map((capital, i) => (
                                    <p
                                        className="text-center"
                                        key={i}>
                                        {capital}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col border rounded-sm py-2 space-y-1">
                            <div className="flex items-center">
                                <Flag className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                <p className="font-medium text-gray-900 dark:text-white">Coat Of Arms:</p>
                            </div>

                            <div className="h-full flex justify-center items-center">
                                <Image
                                    src={main.coatOfArms.svg}
                                    alt={`${main.name.common} Coat of Arms`}
                                    className="aspect-auto object-cover object-center"
                                    width={96}
                                    height={96}
                                    quality={100}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Currency currencies={main.currencies} />
                        </div>

                        <div className="flex items-center">
                            <div className="flex flex-col grow border rounded-sm py-2 space-y-1">
                                <div className="flex items-center">
                                    <Barricade className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                    <p className="font-medium text-gray-900 dark:text-white">Border:</p>
                                </div>
                                <div className="text-center">{getFullCountryNames(main.borders) ?? 'None'}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col border rounded-sm py-2 space-y-1">
                                <div className="flex items-center">
                                    <Planet className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                    <p className="font-medium text-gray-900 dark:text-white">Top-level domain:</p>
                                </div>
                                <p className="text-center">{main.tld}</p>
                            </div>

                            <div className="flex flex-col justify-center border rounded-sm py-2 space-y-1">
                                <div className="flex items-center">
                                    <CalendarDots className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                                    <p className="font-medium text-gray-900 dark:text-white">Start Of Week:</p>
                                </div>

                                <p className="text-center">{main.startOfWeek}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default CountryInfo;
