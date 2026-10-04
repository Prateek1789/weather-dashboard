import { useWeatherStore } from "@/store/store";

import { 
  Card, 
	CardHeader, 
	CardTitle, 
	CardContent 
} from "./ui/card";

import { Calendar } from "lucide-react";
import WeatherIcon from "./weather-icons";

const WeeklyOutlook = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const unitSystem = useWeatherStore(state => state.unitSystem);
	const unit = unitSystem === 'metric' ? 'cel' : 'feh';

	const dailyData = weatherData?.daily || [];
	const globalMin = dailyData.length > 0 ? Math.min(...dailyData.map(d => d.temp_min[unit])) : 0;
  const globalMax = dailyData.length > 0 ? Math.max(...dailyData.map(d => d.temp_max[unit])) : 100;

  const totalRange = globalMax - globalMin;

	return (
		<Card className="w-full h-120 p-4 xl:p-5 justify-between bg-gray-50 dark:bg-card">
			<CardHeader className="w-full flex items-center justify-between p-0">
				<CardTitle className="text-xs tracking-widest text-neutral-400 uppercase">
					7-Day Outlook
				</CardTitle>
				<Calendar size={18} color="#a1a1a1" />
			</CardHeader>
			<CardContent className="h-full p-0">
				<ul 
					className="w-full h-full flex flex-col items-start justify-between"
				>
					{ weatherData?.daily.map((data, idx) => {
						const currentMin = data.temp_min[unit];
						const currentMax = data.temp_max[unit];

						const leftPercent = totalRange > 0 ? ((currentMin - globalMin) / totalRange) * 100 : 0;
            const rightPercent = totalRange > 0 ? ((globalMax - currentMax) / totalRange) * 100 : 0;

						return (
						<li
							key={`day-${data.day}-${idx}`} 
							className="w-full flex items-center justify-between gap-6 rounded-sm bg-linear-to-r from-transparent via-gray-100/40 to-transparent dark:via-gray-900/40 py-3"
						>
							<div className="flex items-center justify-start gap-1">
                <p className="w-9 text-sm">{new Date(data.time).toLocaleDateString('en-us', { weekday: 'short' })}</p>
								<WeatherIcon code={weatherData.daily[idx].weather_code} />
              </div>
							<div className="w-full flex items-center gap-4">
								<p className="text-neutral-400">{currentMin}°</p>

								<div className="h-0.75 w-full relative bg-neutral-300 dark:bg-neutral-700 rounded-full">
									<div 
										className="h-full w-1/2 absolute bg-linear-to-r from-blue-500 to-amber-500"
										style={{ 
											left: `${leftPercent}%`,
											right: `${rightPercent}%`, 
										}}
									></div>
								</div>

								<p>{currentMax}°</p>
							</div>
						</li>
					)}) }
				</ul>
			</CardContent>
		</Card>
	)
};

export default WeeklyOutlook