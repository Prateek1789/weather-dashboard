import { 
  Sun, 
  Moon, 
  CloudSun, 
  CloudMoon, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudHail
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { 
	AQIResponse,
	WeatherResponse,
	WeatherData
 } from "@/types/weather.types";

export interface AQIDictinoary {
	keyword: string;
	description: string;
};

export type WeatherCondition = {
  day: LucideIcon;
  night: LucideIcon;
  label: string;
};

/* ---- A Weather Map which uses Open Meteos weather code to provide label and icon  ---- */

export const WEATHER_CONDITION_MAP: Record<number, WeatherCondition> = {
		0: { day: Sun, night: Moon, label: "Clear sky" },
		1: { day: Sun, night: Moon, label: "Mainly clear" },
		2: { day: CloudSun, night: CloudMoon, label: "Partly cloudy" },
		3: { day: Cloud, night: Cloud, label: "Overcast" },
		45: { day: CloudFog, night: CloudFog, label: "Fog" },
		48: { day: CloudFog, night: CloudFog, label: "Depositing rime fog" },
		51: { day: CloudDrizzle, night: CloudDrizzle, label: "Light drizzle" },
		53: { day: CloudDrizzle, night: CloudDrizzle, label: "Moderate drizzle" },
		55: { day: CloudDrizzle, night: CloudDrizzle, label: "Dense drizzle" },
		56: { day: CloudSnow, night: CloudSnow, label: "Light freezing drizzle" },
		57: { day: CloudSnow, night: CloudSnow, label: "Dense freezing drizzle" },
		61: { day: CloudRain, night: CloudRain, label: "Slight rain" },
		63: { day: CloudRain, night: CloudRain, label: "Moderate rain" },
		65: { day: CloudRain, night: CloudRain, label: "Heavy rain" },
		66: { day: CloudSnow, night: CloudSnow, label: "Light freezing rain" },
		67: { day: CloudSnow, night: CloudSnow, label: "Heavy freezing rain" },
		71: { day: CloudSnow, night: CloudSnow, label: "Slight snowfall" },
		73: { day: CloudSnow, night: CloudSnow, label: "Moderate snowfall" },
		75: { day: CloudSnow, night: CloudSnow, label: "Heavy snowfall" },
		77: { day: CloudSnow, night: CloudSnow, label: "Snow grains" },
		80: { day: CloudRain, night: CloudRain, label: "Slight rain showers" },
		81: { day: CloudRain, night: CloudRain, label: "Moderate rain showers" },
		82: { day: CloudRain, night: CloudRain, label: "Violent rain showers" },
		85: { day: CloudSnow, night: CloudSnow, label: "Slight snow showers" },
		86: { day: CloudSnow, night: CloudSnow, label: "Heavy snow showers" },
		95: { day: CloudLightning, night: CloudLightning, label: "Thunderstorm" },
		96: { day: CloudHail, night: CloudHail, label: "Thunderstorm with slight hail" },
		97: { day: CloudLightning, night: CloudLightning, label: "Heavy thunderstorm" },
		99: { day: CloudHail, night: CloudHail, label: "Thunderstorm with heavy hail" }
};

/* ---- Formatters ---- */

export const toFehrenheit = (c: number) => Math.round((c * 1.8) + 32);
export const toMph = (k: number) => Math.round(k * 0.621371);
export const toInches = (mm: number) => Math.round(mm / 25.4);
export const toIofM = (num: number) => Number((num * 0.02953).toFixed(2));

/* ---- Requests ---- */

export const createAQIRequest = (lat: number, long: number) => {
  return new URLSearchParams({
		'latitude': `${lat}`,
    'longitude': `${long}`,
  	'timezone': 'auto',
  	'forecast_hours': '12',
  	'current': 'us_aqi,uv_index',
  	'hourly': 'us_aqi,uv_index', 
  }).toString();
};

export const createWeatherRequest = (lat: number, long: number) => {
	return new URLSearchParams({
		'latitude': `${lat}`,
		'longitude': `${long}`,
		'timezone': 'auto',
		'forecast_days': '7',
		'forecast_hours': '12',
		'current': [
			'temperature_2m',
			'apparent_temperature',
			'relative_humidity_2m',
			'dew_point_2m',
			'pressure_msl', 
			'wind_gusts_10m',
			'wind_speed_10m',
			'wind_direction_10m',
			'precipitation',
			'weather_code',
			'is_day',
		].join(','),
		'hourly': [
			'temperature_2m',
			'apparent_temperature',
			'wind_gusts_10m',
			'wind_speed_10m',
			'wind_direction_10m',
			'weather_code',
		].join(','),
		'daily': [
			'temperature_2m_max',
			'temperature_2m_min',
			'weather_code',
			'sunrise',
			'sunset'
		].join(',')
	}).toString();
};

/* ---- Data Transformer ---- */

export const structureWeatherData = (
	city: string, 
	country: string, 
	{ current, daily, hourly }: WeatherResponse,
	aqiData: AQIResponse
): WeatherData => {
		
	return {
		city: city,
		country: country,
		current: {
			temp: {
				'cel': Math.ceil(current.temperature_2m),
				'feh': toFehrenheit(current.temperature_2m), 
			},
			feels_like: {
				'cel': Math.ceil(current.apparent_temperature),
				'feh': toFehrenheit(current.apparent_temperature),
			},
			humidity: current.relative_humidity_2m,
			dew_point: {
				'cel': Math.ceil(current.dew_point_2m),
				'feh': toFehrenheit(current.dew_point_2m),
			},
			precipitation: {
				'mm': current.precipitation,
				'in': toInches(current.precipitation),
			},
			wind_gusts: {
				'kmh': Math.round(current.wind_gusts_10m),
				'mph': toMph(current.wind_gusts_10m),
			},
			wind_speed: {
				'kmh': Math.round(current.wind_speed_10m),
				'mph': toMph(current.wind_speed_10m),
			},
			wind_direction: current.wind_direction_10m,
			pressure: {
				'hPa': Math.round(current.pressure_msl),
				'inHg': toIofM(current.pressure_msl),
			},
			aqi: aqiData.current.us_aqi,
			uv_index: Math.round(aqiData.current.uv_index),
			weather_code: current.weather_code,
			is_day: current.is_day
		},
		daily: daily.time.map((time, idx) => ({
			time: time,
			day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
			sunrise: daily.sunrise[idx],
			sunset: daily.sunset[idx],
			temp_max: {
				'cel': Math.ceil(daily.temperature_2m_max[idx]),
				'feh': toFehrenheit(daily.temperature_2m_max[idx])
			},
			temp_min: {
				'cel': Math.ceil(daily.temperature_2m_min[idx]),
				'feh': toFehrenheit(daily.temperature_2m_min[idx]),
			},
			weather_code: daily.weather_code[idx],
		})),
		hourly: hourly.time.map((time, idx) => ({
			time: time,
			temp: {
				'cel': Math.ceil(hourly.temperature_2m[idx]),
				'feh': toFehrenheit(hourly.temperature_2m[idx]),
			},
			feels_like: {
				'cel': Math.ceil(hourly.apparent_temperature[idx]),
				'feh': toFehrenheit(hourly.apparent_temperature[idx]),
			},
			wind_gusts: {
				'kmh': Math.round(hourly.wind_gusts_10m[idx]),
				'mph': toMph(hourly.wind_gusts_10m[idx]),
			},
			wind_speed: {
				'kmh': Math.round(hourly.wind_speed_10m[idx]),
				'mph': toMph(hourly.wind_speed_10m[idx]),
			},
			wind_direction: hourly.wind_direction_10m[idx],
			aqi: aqiData.hourly.us_aqi[idx],
			uv_index: Math.round(aqiData.hourly.uv_index[idx]),
			weather_code: hourly.weather_code[idx],
		})),
	};
};

export const createAQIDictionary = (value: number): AQIDictinoary => {
	if (value <= 50) {
		return { 
			keyword: 'Good', 
			description: 'Clean air. No health risks for anyone.' 
		};
	}
	else if (value > 50 && value <= 100) {
		return { 
			keyword: 'Satisfactory', 
			description: 'Generally safe, might affect highly sensitive people.'
		};
	}
	else if (value > 100 && value <= 150) {
		return { 
			keyword: 'Sensitive', 
			description: 'Unsafe for vulnerable groups of people.' 
		};
	}
	else if (value > 150 && value <= 200) {
		return { 
			keyword: 'Unhealthy', 
			description: 'Unhealthy for everyone. Reduce outdoor activities.' 
		};
	}
	else if (value > 200 && value <= 300) {
		return { 
			keyword: 'Injurious', 
			description: 'Health alert, stay indoors and keep windows closed.' 
		};
	}
	else return { 
		keyword: 'Hazardous', 
		description: 'Emergency conditions, avoid all outdoor activities.' 
	};
};

export const getUVIndexInfo = (value: number) => {
	if (value <= 2) {
		return {
			label: 'Low',
			advice: 'Safe to stay outside. Wear sunglasses on bright days.', 
		};
	}
	else if (value <= 5) {
		return {
			label: 'Moderate',
			advice: 'Apply sunscreen SPF15+. Seek shade around midday.',
		};
	}
	else if (value <= 7) {
		return {
			label: 'High',
			advice: 'Reduce sun exposure between 10 AM and 4 PM.'
		};
	}
	else if (value <= 10) {
		return {
			label: 'Very High',
			advice: 'Minimize sun exposure. Apply SPF30+ every 2 hours. Wear protective clothing.',
		};
	}
	else return {
		label: 'Extreme',
		advice: 'Avoid outdoor exposure during midday. Protective clothing is mandatory.' 
	};
};