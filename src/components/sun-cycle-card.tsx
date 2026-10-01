import { useWeatherStore } from "@/store/store";

import { 
	Card,
	CardHeader,
	CardTitle,
	CardContent 
} from "./ui/card";

import { Sunrise, Sunset } from "lucide-react";

const SunCycleCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const sunrise = new Date(weatherData?.daily[0].sunrise || '').toLocaleTimeString(
		'en-us', 
		{ hour: 'numeric', minute: '2-digit', hour12: true }
	) || '';
	const sunset = new Date(weatherData?.daily[0].sunset || '').toLocaleTimeString(
		'en-US',
		{ hour: 'numeric', minute: '2-digit', hour12: true }
	) || '';

	return (
		<Card className="w-full h-full p-4 xl:p-5 bg-gray-50 dark:bg-card">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="uppercase tracking-widest text-xs">Sun Cycle</CardTitle>
			</CardHeader>

			<CardContent className="w-full h-full flex-col items-end p-0">
				<div className="w-full h-full relative flex flex-col justify-end">
					<svg viewBox="0 0 100 40" className="absolute left-1/2 -translate-x-1/2 bottom-2 w-50">
          	<defs>
          	  <linearGradient id="sunArcGrad" x1="0" y1="0" x2="1" y2="0">
          	    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          	    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
          	    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          	  </linearGradient>
          	</defs>
          	<path d="M 5 35 Q 50 -15 95 35" fill="none" stroke="url(#sunArcGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        	</svg>
					<div className="w-full flex items-baseline justify-between">
						<div className="flex flex-col gap-1 item-start">
							<Sunrise size={14} color="oklch(70.8% 0 none)" aria-hidden />
							<span className="uppercase">{sunrise}</span>
						</div>
						<div className="flex flex-col gap-1 items-end">
							<Sunset size={14} color="oklch(70.8% 0 none)" aria-hidden />
							<span className="uppercase">{sunset}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
};

export default SunCycleCard