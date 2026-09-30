import { useWeatherStore } from "@/store/store";

import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardContent 
} from "./ui/card";

import { Gauge } from "lucide-react"; 

const PressureCard = () => {
	const weatherData = useWeatherStore(state => state.weatherData);
  const unitSystem = useWeatherStore(state => state.unitSystem);
  const unit = unitSystem === 'metric' ? 'hPa' : 'inHg';

	const pressure = weatherData?.current.pressure[unit] || 0;
	const bounds = unit === 'hPa' ? { min: 950, max: 1050 } : { min: 28.00, max: 31.00 };
	const percentage = Math.min(Math.max((pressure - bounds.min) / (bounds.max - bounds.min), 0), 1);

	const pathLength = 198; 
	const strokeDashoffset = pathLength - (percentage * pathLength);

	return (
		<Card className="p-4 xl:p-5 flex-col justify-between bg-transparent">
			<CardHeader className="w-full p-0 flex items-center justify-between text-neutral-400">
				<CardTitle className="text-xs tracking-widest uppercase">Pressure</CardTitle>
        <Gauge size={18} aria-hidden />
			</CardHeader>

			<CardContent className="h-full p-0 flex items-center justify-center gap-2">
				<div className="relative w-full aspect-100/85">
          <svg viewBox="0 0 100 85" className="absolute top-0 left-0 w-full h-full">
            <defs>
              <linearGradient id="pressureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            	</linearGradient>
              <mask id="pressureMask">
                <path
                  d="M 16.25 75 A 42 42 0 1 1 83.75 75"
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  strokeDasharray={`${pathLength} ${pathLength}`}
									strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
									className="transition-all duration-240 ease-out"
                />
              </mask>
            </defs>
            <path
              d="M 16.25 75 A 42 42 0 1 1 83.75 75"
              fill="none"
              strokeWidth="6"
              strokeDasharray="2 4"
							className="stroke-neutral-200 dark:stroke-neutral-700"
            />
            <path
              d="M 16.25 75 A 42 42 0 1 1 83.75 75"
              fill="none"
              stroke="url(#pressureGrad)"
              strokeWidth="6"
              strokeDasharray={"2 4"}
              mask="url(#pressureMask)"
            />
          </svg>
                      
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
             <span className="text-3xl xl:text-4xl">{pressure}</span>
             <span className="text-neutral-400 mt-0.5">{unit}</span>
          </div>
                      
          <div className="absolute -bottom-1.25 w-full flex justify-between px-1">
             <span className="text-black/40 dark:text-white/40 text-[10px] font-medium uppercase tracking-wider">Low</span>
             <span className="text-black/40 dark:text-white/40 text-[10px] font-medium uppercase tracking-wider">High</span>
          </div>
        </div>
			</CardContent>
		</Card>
	)
};

export default PressureCard