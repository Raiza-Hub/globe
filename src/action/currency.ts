import axios from "axios";

const currencyApiKey = process.env.EXCHANGE_RATE_API_KEY;

export const getCurrency = async () => {
    try {
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/${currencyApiKey}/latest/USD`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error;
    }
};