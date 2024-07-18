"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCountries } from "@/hooks/use-countries";
import { useRegion } from "@/hooks/use-region";
import { Country } from "@/types/countries";
import { ArrowURightUp, MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import { ChangeEvent, useState, useEffect } from "react";
import Countries from "@/components/country/Countries";
import CountrySkeleton from "@/components/country/country-skeleton";
import NotFound from "@/components/NotFound";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";



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
] as const;

const Page = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [filter, setFilter] = useState<string>('all');
    const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

    const { data: countries, isError: errCountries, isLoading: loadCountries } = useCountries();
    const { data: continents, isError: errContinents, isLoading: loadContinets } = useRegion(filter);

    const filteredCountry = countries?.filter((country: Country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredRegion = continents?.filter((country: Country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const paginatedCountries = filter !== 'all' ? filteredRegion : filteredCountry;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full flex flex-col px-4 lg:px-6 mt-8 lg:mt-12">
            {/* Desktop filter */}
            <div className='hidden w-full relative lg:flex'>
                {SORT_OPTIONS.map((option) => (
                    <div
                        key={option.value}
                        className='group flex justify-around'
                    >
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setFilter(option.value);
                            }}
                        >
                            <p className='text-sm text-gray-700 group-hover:text-gray-900 dark:text-white dark:group-hover:text-white font-medium'>
                                {option.name}
                            </p>
                        </Button>
                    </div>
                ))}
            </div>
            {/* TODO: Mobile filter */}
            <div className="flex items-center lg:hidden">
                <div className='text-xl font-bold mr-2'>Category:</div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="group inline-flex justify-center items-center text-md font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:group-hover:text-white border px-4 py-1 rounded-sm">
                        Sort
                        <Funnel
                            className="-mr-1 ml-1 size-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden='true'
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {SORT_OPTIONS.map(option => (
                            <button
                                key={option.name}
                                className={cn('text-left w-full block px-4 py-2 text-sm', {
                                    "text-gray-900 bg-gray-100 dark:text-white dark:bg-white/30": option.value === filter,
                                    "text-gray-500 dark:text-white": option.value !== filter,
                                })}
                                onClick={() => {
                                    setFilter(option.value);
                                }}
                            >
                                {option.name}
                            </button>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* SEARCHBAR: filtering the data */}
            <div className="w-full lg:max-w-2xl flex flex-col mx-auto mt-10 lg:mt-16 space-y-3">
                <div className="flex items-center justify-center ring-1 ring-gray-500 focus-within:ring-gray-400 rounded-md">
                    <MagnifyingGlass
                        className='size-5 ml-4 text-gray-700 group-hover:text-gray-900 dark:text-white dark:group-hover:text-white'
                        aria-hidden='true'
                    />
                    <Input
                        value={searchText}
                        onChange={onChange}
                        className='border-0 dark:text-white dark:placeholder:text-white'
                        placeholder={filter !== 'all' ? (
                            `Search ${continents?.length} countries...`
                        ) : (
                            `Search 250 countries...`
                        )}
                        autoComplete="off"
                    />
                </div>
                <p className='flex justify-center text-muted-foreground dark:text-white'>What&apos;s your favourite 💖 country?</p>
            </div>

            <section className="w-full lg:container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(loadCountries || loadContinets) ? (
                    new Array(9)
                        .fill(null)
                        .map((_, i) => <CountrySkeleton key={i} />)
                ) : (errCountries || errContinents) ? (
                    <div className="flex items-center col-span-3">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <p className="flex text-sm font-medium text-gray-900">Something went wrong</p>
                    </div>
                ) : (paginatedCountries && paginatedCountries.length > 0) ? (
                    paginatedCountries?.map((country: Country, i: number) => (
                        <Countries key={i} country={country} />
                    ))
                ) : (
                    <div className='-mt-12 mb-20 col-span-3'>
                        <NotFound searchTerm={searchText} />
                    </div>
                )}
            </section>

            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 bg-black/30 dark:bg-white/30 backdrop-blur-lg text-white p-3 rounded-full"
                >
                    <ArrowURightUp
                        className='size-5'
                        aria-hidden='true'
                    />
                </button>
            )}
        </div>
    );
}

export default Page;
