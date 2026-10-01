import { useWeatherStore } from "@/store/store";
import { createAQIDictionary } from "@/lib/weather.utils";

import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardContent 
} from "./ui/card"

import { Wind } from "lucide-react";

const AQICard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const aqi = weatherData?.current.aqi || 0;
	const aqiDictionary = createAQIDictionary(aqi);
	const percentage = Math.min(Math.max((aqi / 5), 0), 100);

	return (
		<Card className="flex-col justify-between shrink-0 p-4 xl:p-5 bg-gray-50 dark:bg-card">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="text-xs uppercase tracking-widest">Air Quality</CardTitle>
				<Wind size={18} aria-hidden />
			</CardHeader>

			<CardContent className="p-0 flex flex-col items-start justify-end gap-2">
				<div className="flex items-baseline gap-1">
					<p className="text-4xl">{aqi}</p>
					<p className="text-neutral-400 capitalize">{aqiDictionary?.keyword}</p>
				</div>
				<div className="w-full h-1.25 relative rounded-full bg-linear-to-r from-teal-400 via-orange-400 to-red-700">
					<div 
						style={{ left: `${percentage}%` }}
						className={`h-2 w-2 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full border border-blue-500 transition-all duration-240 ease-out`}></div>
				</div>
				<p className="text-xs text-neutral-400 mt-1">{aqiDictionary?.description}</p>
			</CardContent>
		</Card>
	)
};

export default AQICard