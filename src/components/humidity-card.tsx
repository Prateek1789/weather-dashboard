import { useWeatherStore } from "@/store/store";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "./ui/card";

import { Droplets } from "lucide-react";

const HumidityCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
	const unitSystem = useWeatherStore(state => state.unitSystem);
	const unit = unitSystem === 'metric' ? 'cel' : 'feh';

	const humidity = weatherData?.current.humidity || 0;
	const dewPoint = weatherData?.current.dew_point[unit];

	const clampedPercentage = Math.max(0, Math.min(100, humidity));
	const dropletHeight = 18;
  const dropletBottomY = 21.5;
  
  const fillHeight = dropletHeight * (clampedPercentage / 100);
  const fillY = dropletBottomY - fillHeight;

	return (
		<Card className="p-4 xl:p-5 flex-col justify-between bg-gray-50 dark:bg-card">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="text-xs tracking-widest uppercase">Humidity</CardTitle>
				<Droplets size={18} aria-hidden />
			</CardHeader>

			<CardContent className="p-0 flex flex-col gap-2">
				<div className="w-full flex flex-col items-start gap-2">
					<svg
      			width={60}
      			height={60}
      			viewBox="13 2.5 5 20"
      			fill="none"
      			className={''}
    			>
      			<defs>
        			<clipPath id="path">
        	  		<rect x="0" y={fillY} width="24" height={fillHeight} className="transition-all duration-240 ease-out" />
        			</clipPath>
      			</defs>
      			<path
      			  d="M12 21.5C8.7 21.5 6 18.8 6 15.5C6 11.6 12 3.5 12 3.5C12 3.5 18 11.6 18 15.5C18 18.8 15.3 21.5 12 21.5Z"
      			  strokeWidth={1}
      			  className={'fill-gray-100 stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-800'}
      			/>
      			<path
      			  d="M12 21.5C8.7 21.5 6 18.8 6 15.5C6 11.6 12 3.5 12 3.5C12 3.5 18 11.6 18 15.5C18 18.8 15.3 21.5 12 21.5Z"
      			  className={'fill-blue-300 dark:fill-blue-400'}
      			  clipPath={"url(#path)"}
      			/>
   				</svg>
					<div className="flex items-baseline gap-1">
						<p className="text-4xl">{humidity}</p>
						<span className="text-neutral-400">%</span>
					</div>
				</div>
				<p className="text-xs text-neutral-400">{`The dew point is ${dewPoint}° right now.`}</p>
			</CardContent>
		</Card>
	)
};

export default HumidityCard