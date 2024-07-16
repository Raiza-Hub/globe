import axios from "axios";



const key = process.env.OPENWEATHER_API_KEY;

const BASEURL = 'https://api.openweathermap.org/data/2.5'

export const getWeather = async (lat: number, lon: number) => {
    try {
        const res = await axios.get(`${BASEURL}/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error)
        return error
    }
}

export const getAirPollution = async (lat: number, lon: number) => {
    try {
        const res = await axios.get(`${BASEURL}/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error)
        return error;
    }
}
export const getDailyForecast = async (lat: number, lon: number) => {
    try {
        const response = await fetch(`${BASEURL}/forecast?lat=${lat}&lon=${lon}&appid=${key}`, {
            next: { revalidate: 3600 }
        })

        const responseData = await response.json()

        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error;
    }
}
export const dailyUvIndex = async (lat: number, lon: number) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`, {
            next: { revalidate: 900 }
        })

        const responseData = await response.json()

        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error)
        return error;
    }
}
