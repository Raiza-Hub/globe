import { getRegion } from "@/action/countries";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";


export const useRegion = (sort: string) => {
    return useQuery<Country[], Error>({
        queryKey: ['region', sort],
        queryFn: () => getRegion(sort)
    });
};

