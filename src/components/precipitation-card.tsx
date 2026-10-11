import { useWeatherStore } from "@/store/store";
import { getPrecipitationSummary } from "@/lib/weather.utils";

import { 
	Card,
	CardHeader,
	CardTitle,
	CardContent 
} from "./ui/card";

import { CloudRain } from "lucide-react";

const PrecipitationCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const unitSystem = useWeatherStore(state => state.unitSystem);
	const daily = weatherData?.daily || [];
	const hourly = weatherData?.hourly || [];

	const unit = unitSystem === 'metric' ? 'mm' : 'in';
	const precipitation = weatherData?.current.precipitation[unit];
	const summary = getPrecipitationSummary({ daily, hourly, unit });

	return (
		<Card className="w-full h-full p-4 xl:p-5 flex-col justify-between gap-0 bg-gray-50 dark:bg-card">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="uppercase tracking-widest text-xs">Precipitation</CardTitle>
				<CloudRain size={18} aria-hidden />
			</CardHeader>
			<CardContent className="w-full h-full flex flex-col justify-end p-0">
				{ weatherData && (
					<>
						<div className="flex items-baseline gap-1">
							<span className="text-4xl">{precipitation}</span>
							<span className="text-neutral-400">{unit}</span>
						</div>
						<p className="text-xs text-neutral-400 mt-1">{summary}</p>
					</>
				) }
			</CardContent>
		</Card>
	)
};

export default PrecipitationCard