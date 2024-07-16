import { allCountries } from "@/action/countries"
import { Country } from "@/types/countries"

export default async function sitemap() {
    const country: Country[] = await allCountries();
    const countryNames = country.map(country => country.name.common);
  
    const countries = countryNames.map((name) => ({
        url: `http://localhost:3000/countries/${name}`,
        lastModified: new Date().toISOString()
    }))

    const routes = ['', '/countries'].map((route) => ({
        url: `http://localhost:3000${route}`,
        lastModified: new Date().toISOString()
    }))

    return [...routes, ...countries]
}