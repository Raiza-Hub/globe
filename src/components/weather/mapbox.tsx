"use client"

import dynamic from 'next/dynamic';
import {  useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { FC, useEffect } from 'react';
import { Coord, WeatherData } from '@/types/weather';

interface mapBoxProps {
    forecast: WeatherData
}

interface FlyToActiveCityProps {
    activeCityCords: Coord;
}

const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then(mod => mod.TileLayer),
    { ssr: false }
);



const FlyToActiveCity = ({ activeCityCords }: FlyToActiveCityProps) => {
    const map = useMap();

    useEffect(() => {
        if (activeCityCords) {
            const zoomLev = 13;
            const flyToOptions = {
                duration: 1.5,
            };

            map.flyTo(
                [activeCityCords.lat, activeCityCords.lon],
                zoomLev,
                flyToOptions
            );
        }
    }, [activeCityCords, map]);

    return null;
}


const MapBox = ({ forecast }: mapBoxProps) => {


    const activeCityCords = forecast?.coord;

    if (!forecast || !forecast.coord || !activeCityCords) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    return (
        <div className='flex-1 basis-[50%] border rounded-lg h-[20rem]'>
            <MapContainer
                center={[activeCityCords.lat, activeCityCords.lon]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <FlyToActiveCity activeCityCords={activeCityCords} />
            </MapContainer>
        </div>
    )
}

export default MapBox;