"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCountries } from "@/hooks/use-countries";
import { useRegion } from "@/hooks/use-region";
import { searchBarSchema } from "@/schema/search-bar";
import { Country } from "@/types/countries";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Countries from "@/components/country/Countries";
import CountrySkeleton from "@/components/country/country-skeleton";


const SORT_OPTIONS = [
    { name: "All", value: "all", image: "/asia.png" },
    { name: "Europe", value: "europe", image: "/asia.png" },
    { name: "Africa", value: "africa", image: "/asia.png" },
    { name: "Asia", value: "asia", image: "/asia.png" },
    { name: "Oceania", value: "oceania", image: "/asia.png" },
    { name: "Caribbean", value: "caribbean", image: "/asia.png" },
    { name: "North America", value: "north America", image: "/asia.png" },
    { name: "South America", value: "south America", image: "/asia.png" },
    { name: "Central America", value: "central America", image: "/asia.png" },
] as const


interface FilterState {
    sort: string
    filteredCountries: Country[] | undefined
    continent: Country[] | undefined
}


const Page = () => {
    const [searchText, setSearchText] = useState<string>("all");

    const [filter, setFilter] = useState<FilterState>({
        sort: 'all',
        filteredCountries: undefined,
        continent: []
    });

    const { data: countries, isError, isLoading } = useCountries();

    const { data: continent } = useRegion(filter.sort);

    const router = useRouter()

    useEffect(() => {
        if (countries) {
            setFilter(prevState => ({
                ...prevState,
                filteredCountries: countries,
                continent
            }));
        }
    }, [countries, continent]);


    const { register, handleSubmit, getValues } = useForm<z.infer<typeof searchBarSchema>>({
        resolver: zodResolver(searchBarSchema),
        defaultValues: {
            name: "",
        },
    });

    const handleInputChange = () => {
        const value = getValues('name');
        router.push(`/countries/?sort=${filter.sort}&search=${value}`);
    };

    const onSubmit = (values: z.infer<typeof searchBarSchema>) => {

        const filteredCountries = countries?.filter((country: Country) =>
            country.name.common.toLowerCase().includes(values.name.toLowerCase())
        )

        const filteredRegion = continent?.filter((country: Country) =>
            country.name.common.toLowerCase().includes(values.name.toLowerCase())
        )


        setFilter(prev => ({
            ...prev,
            filteredCountries,
            continent: filteredRegion
        }));

    };

    const paginatedCountries =
    filter.sort !== 'all' ?
        filter?.continent :
        filter?.filteredCountries

    return (
        <div className="w-full flex flex-col items-center px-4 lg:px-6 mt-8 lg:mt-12">
            <div className='w-full relative flex'>
                {SORT_OPTIONS.map((option) => (
                    <div
                        key={option.value}
                        className='group flex justify-around'
                    >
                        <Button
                            variant="ghost"
                            onClick={() => {

                                router.push(`/countries/?sort=${option.value}`);

                                setFilter(prev => ({
                                    ...prev,
                                    sort: option.value,
                                }));
                            }}
                        >
                            <p className='text-sm text-gray-700 group-hover:text-gray-900 font-medium'>
                                {option.name}
                            </p>
                        </Button>
                    </div>
                ))}
            </div>
            {/* {TODO: Mobile filter} */}

            <div className="w-full lg:max-w-2xl flex flex-col  mx-auto mt-10 lg:mt-16 space-y-3">
                <div className="flex items-center justify-center ring-1 ring-gray-400 focus-within:ring-gray-500 rounded-md disabled:opacity-30">
                    <MagnifyingGlass className='size-5 ml-4 text-gray-700 group-hover:text-gray-900' />
                    <Input
                        {...register('name')}
                        className='border-0'
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(onSubmit)()
                                handleInputChange()
                            }
                        }}
                        placeholder="Search 250 countries..."
                        autoComplete="off"
                    />
                </div>
                <p className='flex justify-center text-muted-foreground'>What&apos;s your favourite country?</p>
            </div>


            <section className="w-full lg:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-4">
                {isLoading ? (
                    new Array(9)
                        .fill(null)
                        .map((_, i) => <CountrySkeleton key={i} />)
                ) : isError ? (
                    <div className="flex items-center">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <p className="flex text-sm font-medium text-gray-900">Something went wrong</p>
                    </div>
                ) : (
                    paginatedCountries?.map((country, i) => (
                        <Countries key={i} country={country} />
                    ))
                )}
            </section>

        </div>
    );
}

export default Page;