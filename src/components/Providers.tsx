"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const MINUTE = 1000 * 60;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
           staleTime:  10 * MINUTE
        }
    }
})

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers