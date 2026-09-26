import type { StateCreator } from "zustand";

import type {
	RequestObj, 
	WeatherData,
	WeatherError, 
} from "@/types/weather.types";

import { 
	createAQIRequest,
	createWeatherRequest,
	structureWeatherData	 
} from "@/lib/weather.utils";

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const AQI_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export interface WeatherSlice {
  weatherData: WeatherData | null;
	isWeatherDataLoading: boolean;
	isWeatherError: boolean;
  getWeatherData: (req: RequestObj) => void;
};

export const createWeatherSlice: StateCreator<WeatherSlice> = (set) => ({
  weatherData: null,
	isWeatherDataLoading: false,
	isWeatherError: false,
	getWeatherData: async (req) => {
		set({ isWeatherDataLoading: true });

		try {
			const [weatherResponse, aqiResponse] = await Promise.all([
				fetch(`${WEATHER_URL}?${createWeatherRequest(req.latitude, req.longitude)}`),
				fetch(`${AQI_URL}?${createAQIRequest(req.latitude, req.longitude)}`),
			]);

			if (!weatherResponse.ok || !aqiResponse.ok) {
				throw new Error('Network request failed.');
			};

			const weatherData = await weatherResponse.json();
			const aqiData = await aqiResponse.json();

			if (weatherData.error) {
				set({ isWeatherError: true, isWeatherDataLoading: false });
				throw new Error((weatherData as WeatherError).reason);
			};

			const struturedWeatherData = structureWeatherData(req.city, req.country, weatherData, aqiData);
			set({ weatherData: struturedWeatherData, isWeatherDataLoading: false, isWeatherError: false });
		}
		catch (err: any) {
			console.log(err instanceof Error ? err.message : err);
		};
	},
});