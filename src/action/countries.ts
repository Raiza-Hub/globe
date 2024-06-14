import axios from "axios"


const BASEURL = 'https://restcountries.com/v3.1';
const currencyKey = process.env.EXCHANGE_RATE_API_KEY;

export const allCountries = async () => {
    try {
        const res = await axios.get(`${BASEURL}/all`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error)
       return error;
    }
};


export const getRegion = async (sort: string) => {
    try {
        if (sort === 'all') {
            return []; // No need to fetch data for 'all'
        };
        const res = await axios.get(`${BASEURL}/region/${sort}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error)
       return error;
    }
};

export const getCountry = async (countryId: string) => {
    try {
        const res = await axios.get(`${BASEURL}/name/${countryId}?fullText=true`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error)
       return error;
    }
};
