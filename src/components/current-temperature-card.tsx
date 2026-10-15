import { useWeatherStore } from "@/store/store";

import { 
	Card,
	CardHeader,
	CardContent,
 } from "./ui/card";

import { WEATHER_CONDITION_MAP } from "@/lib/weather.utils";
import WeatherIcon from "./weather-icons";

import { MapPin } from "lucide-react"; 

const CurrentTempCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const toggleUnitSystem = useWeatherStore(state => state.switchUnitSystem);
	const unitSystem = useWeatherStore(state => state.unitSystem);
	const unit = unitSystem === 'metric' ? 'cel' : 'feh';

	return (
		<Card className="w-full h-full flex-col justify-between p-4 xl:p-5 bg-gray-50 dark:bg-card">
			<CardHeader className="flex justify-between p-0">
				<div className="p-2 pr-4 flex items-center gap-1 bg-gray-200 dark:bg-neutral-700/70 rounded-lg">
					<MapPin size={18} />
					<h2 className="uppercase tracking-widest">{weatherData?.city}</h2>
				</div>
				<button
					aria-label={`Toggle unit system. Current system: ${unitSystem}`}
					onClick={toggleUnitSystem}
					className="h-9 p-0.5 flex items-center justify-between rounded-md gap-0.5 border"
				>
					<div className={`h-full aspect-square p-2 grid place-content-center rounded-sm ${unitSystem === 'metric' ? 'bg-neutral-700 text-white' : ''}`}>
						C°
					</div>
					<div className={`h-full aspect-square p-2 grid place-content-center rounded-sm ${unitSystem === 'imperial' ? 'bg-neutral-700 text-white' : ''}`}>
						F°
					</div>
				</button>
			</CardHeader>
			<CardContent className="w-full h-full p-0 grid grid-rows-[2fr_1fr] items-start gap-8">
				{ weatherData && (
					<>
						<div className="w-full h-full p-0 flex items-end justify-between">
							<h3 className="text-8xl">{weatherData?.current.temp[unit]}°</h3>
							<div className="flex items-center gap-2">
								<WeatherIcon code={weatherData.current.weather_code} isDay={Boolean(weatherData.current.is_day)} size={24} /> 
								<p className="text-lg capitalize">
								{WEATHER_CONDITION_MAP[weatherData.current.weather_code].label}
								</p>
							</div>
						</div>
						<div className="w-full h-full grid grid-cols-3 grid-rows-1">
							<CurrentDetails title={'Feels Like'} data={weatherData.current.feels_like[unit]} />
							<CurrentDetails title={'Low'} data={weatherData.daily[0].temp_min[unit]} className="border-x" />
							<CurrentDetails title={'High'} data={weatherData.daily[0].temp_max[unit]} />
						</div>
					</>
					)
				}
			</CardContent>
		</Card>
	)
};

export default CurrentTempCard

interface CurrentDetailsProps {
	title: string;
	data: string | number;
};

const CurrentDetails = ({ 
	title, 
	data, 
	className 
}: CurrentDetailsProps & React.ComponentProps<'div'>) => {
	return (
		<div className={`w-full h-full px-2 flex flex-col divide-accent ${className}`}>
			<div className="flex items-center justify-center py-2 px-1">
				<span className="uppercase tracking-widest text-xs text-neutral-400">{title}</span>
			</div>
			<div className="h-full w-full flex items-center justify-center">
				<span className="text-3xl text-neutral-600 dark:text-neutral-300">
					{data}°
				</span>
			</div>
		</div>
	)
};