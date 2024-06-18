import { getRegion } from "@/action/countries";
import { useQuery } from "@tanstack/react-query";


export const useRegion = (sort: string) => {
    return useQuery({
        queryKey: ['region', sort],
        queryFn: () => getRegion(sort)
    });
};

