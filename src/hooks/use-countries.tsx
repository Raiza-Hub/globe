import { allCountries } from "@/action/countries";
import { useQuery } from "@tanstack/react-query";


export const useCountries = () => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: () => allCountries()
    });
};

