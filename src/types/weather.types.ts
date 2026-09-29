export interface RequestObj {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export interface WeatherError {
  error: boolean;
  reason: string;
};

export interface Temperature {
  'cel': number;
  'feh': number;
};

export interface Speed {
  'kmh': number;
  'mph': number;
};

export interface Length {
  'mm': number;
  'in': number;
};

export interface Preassure {
  'hPa': number;
  'inHg': number;
};

export interface AQIResponse {
  current: {
    time: string;
    us_aqi: number;
		uv_index: number;
  },
	hourly: {
		time: string[],
		us_aqi: number[];
		uv_index: number[];
	}
};  

export interface RawCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  relative_humidity_2m: number;
  dew_point_2m: number;
  wind_gusts_10m: number;
	surface_pressure: number,
  weather_code: number;
};

export interface RawDaily {
  time: string[];
  sunrise: string[];
  sunset: string[];
  weather_code: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
};

export interface RawHourly {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  wind_gusts_10m: number[];
  weather_code: number[];
};

export interface WeatherResponse {
  current: RawCurrent;
  daily: RawDaily;
  hourly: RawHourly;
};

export interface StructuredCurrent {
  temp: Temperature;
  feels_like: Temperature;
  precipitation: Length;
  humidity: number;
  dew_point: Temperature;
  wind_gusts: Speed;
  aqi: number,
  uv_index: number
  pressure: Preassure;
  weather_code: number;
};

export interface StructuredDaily {
  time: string;
  day: string;
  sunrise: string;
  sunset: string;
  temp_min: Temperature;
  temp_max: Temperature;
  weather_code: number;
};

export interface StructuredHourly {
  time: string;
  temp: Temperature;
  feels_like: Temperature;
  wind_gusts: Speed;
	aqi: number;
	uv_index: number;
  weather_code: number;
};

export interface WeatherData {
  city: string;
  country: string;
  current: StructuredCurrent;
  daily: StructuredDaily[];
  hourly: StructuredHourly[];
};

/* export interface GroupedHourly {
    [key: string]: StructuredHourly[];
}; */
