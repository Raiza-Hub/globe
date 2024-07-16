import { allCountries, getCountry } from "@/action/countries";
import CountryInfo from "@/components/country/Country";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Weather from "@/components/weather/Weather";
import { Country } from "@/types/countries";
import { Metadata } from "next"

interface pageProps {
    params: {
        countriesId: string
    }
}


export async function generateMetadata({ params }: pageProps): Promise<Metadata> {
    const { countriesId } = params;

    try {
        const name: Country[] = await getCountry(countriesId);
        const countryNames = name.map(country => country.name.common);
        const countryName = countryNames[0] || 'Country';

        return { title: countryName };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return { title: 'Country' };
    }
}

export async function generateStaticParams() {
    const country: Country[] = await allCountries();
    const countryNames = country?.map(country => country.name.common);

    return countryNames.map((name) => {
        return {
            countryId: name
        }
    })
}



const Page = async ({ params }: pageProps) => {
    const { countriesId } = params;

    const cleanText = (text: string) => {
        return text.replace(/%20/g, ' ').replace(/%/g, '');
    };

    // Clean the text
    const cleanedText = cleanText(countriesId);


    return (
        <div className="w-full flex flex-col justify-center px-4 mt-8 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href='/'
                            className="font-medium text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
                        >
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href='/countries'
                            className="font-medium text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
                        >
                            Countries
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/countries/${countriesId}`}
                            className="font-medium text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
                        >
                            {cleanedText}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
                <CountryInfo countriesId={countriesId} />
            </div>

            <div className='w-full flex flex-col mt-20'>
                <div className="space-y-2 mb-5">
                    <h1 className="text-3xl font-bold sm:text-4xl">Weather</h1>
                    <p className="text-lg text-muted-foreground">Showing weather report on the capital of {" "}
                        <span className="text-gray-900 font-semibold dark:text-white">{cleanedText}</span>
                    </p>
                </div>

                <Weather countriesId={countriesId} />
            </div>
        </div>
    )
}

export default Page;