import { useWeatherStore } from "@/store/store";

import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardContent 
} from "./ui/card";

import { getUVIndexInfo } from "@/lib/weather.utils";

import { SunMedium } from "lucide-react"; 

const UVIndexCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const isDay = weatherData?.current.is_day || 0;
	const uvIndex = weatherData?.current.uv_index || 0;
	const percentage = Math.min(Math.max((uvIndex * 10), 0), 100);
	const uvInfo = getUVIndexInfo({ isDay, value: uvIndex });

	return (
		<Card className="p-4 xl:p-5 flex-col justify-between bg-gray-50 dark:bg-card">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="text-xs tracking-widest uppercase">UV Index</CardTitle>
				<SunMedium size={18} aria-hidden />
			</CardHeader>

			<CardContent className="p-0 flex flex-col items-start justify-end gap-2">
				<div className="flex items-baseline gap-1">
					<p className="text-4xl">{uvIndex}</p>
					<p className="text-neutral-400 capitalize">{uvInfo.label}</p>
				</div>
				<div className="w-full h-1.25 relative rounded-full bg-linear-to-r from-teal-400 via-red-400 to-purple-400">
					<div 
						style={{ left: `${percentage}%` }}
						className={`h-2 w-2 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full border border-blue-600 transition-all duration-240 ease-out`}></div>
				</div>
				<p className="text-xs text-neutral-400 mt-1">{uvInfo.advice}</p>
			</CardContent>
		</Card>
	)
};

export default UVIndexCard