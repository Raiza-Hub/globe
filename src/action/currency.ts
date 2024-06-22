import axios from "axios";

// const apiKey = process.env.EXCHANGE_RATE_API_KEY;
// console.log(apiKey);

export const getCurrency = async () => {
    try {
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/e2bcbb00a069a2beaaf9f645/latest/USD`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error;
    }
};