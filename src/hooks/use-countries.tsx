import { allCountries } from "@/action/countries";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";


export const useCountries = () => {
    return useQuery<Country[], Error>({
        queryKey: ['countries'],
        queryFn: () => allCountries()
    });
};

