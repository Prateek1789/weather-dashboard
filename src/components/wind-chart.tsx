import { useState, useMemo } from "react";
import { useWeatherStore } from "@/store/store";

import { 
	Bar, 
	BarChart,
	XAxis,
	Rectangle,
	type BarShapeProps
} from "recharts";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
	CardContent, 
	CardDescription, 
} from "./ui/card";

import { 
	ChartContainer, 
	ChartTooltip, 
	ChartTooltipContent,
	type ChartConfig
} from "./ui/chart";

import { Compass, Wind } from "lucide-react";

const chartConfig = {
	gusts: {
		label: 'Gusts',
		color: 'var(--chart-2)'
	},
	wind: {
		label: 'Wind',
		color: 'var(--chart-1)',
	}
} satisfies ChartConfig;

const directionMap = [
  "N", "NNE", "NE", "ENE", 
  "E", "ESE", "SE", "SSE", 
  "S", "SSW", "SW", "WSW", 
  "W", "WNW", "NW", "NNW",
];

const WindChart = () => {
	const [activeData, setActiveData] = useState<'wind' | 'gusts'>("wind");
	const toggleActiveData = () => {
		setActiveData(prev => prev === 'wind' ? "gusts" : 'wind');
	};

	const weatherData = useWeatherStore(state => state.weatherData); 
	const selectedUnit = useWeatherStore(state => state.unitSystem);
	const unit = selectedUnit === 'metric' ? 'kmh' : 'mph';

	const wind = weatherData?.current.wind_speed[unit] || 0;
	const gusts = weatherData?.current.wind_gusts[unit] || 0;
	const degrees = weatherData?.current.wind_direction || 0;
	const normalizedDegree = ((degrees % 360) + 360) % 360;
	const index = Math.floor((normalizedDegree + 11.25) / 22.5) % 16;
	const direction = directionMap[index];

	const currentHour = new Date().toLocaleTimeString('en-us', { hour: '2-digit' });

	const windData = useMemo(() => {
		return weatherData?.hourly.map((data) => ({
			time: new Date(data.time).toLocaleTimeString('en-us', { hour: '2-digit' }),
			wind: data.wind_speed[unit],
			gusts: data.wind_gusts[unit],	
		}));
	}, [unit, weatherData?.hourly]);

  return (
		<Card className="w-full h-70 p-4 xl:p-5 rounded-2xl justify-between gap-0 bg-gray-50 dark:bg-card">
			<CardHeader className="flex items-center justify-between p-0">
				<div className="flex items-center gap-2 text-neutral-400">
					<Wind size={18} aria-hidden />
					<CardTitle className="text-xs uppercase tracking-widest">Wind Dynamics</CardTitle>
				</div>
				<button 
					type="button"
					onClick={toggleActiveData}
					className="p-0.5 flex items-center justify-center rounded-md border text-xs align-middle"
				>
					<span className={`p-1 px-2 rounded-sm ${activeData === 'wind' ? 'bg-chart-2 text-white' : ''}`}>Wind</span>
					<span className={`p-1 px-2 rounded-sm ${activeData === 'gusts' ? 'bg-chart-2 text-white' : ''}`}>Gusts</span>
				</button>
			</CardHeader>

			<CardContent className="p-0 mt-auto">
				<ChartContainer 
					config={chartConfig}
					className="h-40 w-full" 
				>
					<BarChart
						accessibilityLayer
						data={windData}
					>
						<defs>
    					 <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity={0}/>
              	</linearGradient>
              	<linearGradient id="windGradientActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
  					</defs>
						<XAxis 
							dataKey={'time'} 
							tickLine={false}
							tickMargin={8}
							axisLine={false}
							tickSize={2}
							fontSize={12}
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar 
							dataKey={activeData === "wind" ? 'wind' : 'gusts'}
							fill="var(--chart-1)"
							style={{ fill: "url(#windGradient)" }}
							radius={6}
							barSize={5}
							shape={({ payload, ...props }: BarShapeProps) => {
								const entryHour = payload.time;
								const isCurrentHour = entryHour === currentHour;

								return isCurrentHour ? (
									<Rectangle 
										{ ...props }
										fill="var(--chart-1)"
										style={{ fill: isCurrentHour ? 'url(#windGradientActive)' : 'url(#windGradient)' }}
									/>
								) : ( <Rectangle { ...props } /> )
							}}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			
			<CardDescription className="flex items-end justify-between">
				<div className="flex items-baseline gap-1">
					<h3 className="text-4xl text-foreground">{activeData === "wind" ? wind : gusts}</h3>
					<span className="text-neutral-400">{unit}</span>
				</div>
				<div className="flex items-center gap-2">
					<Compass size={18} color="#a1a1a1" />
					<p className="text-foreground">{degrees}° {direction}</p>
				</div>
			</CardDescription>
		</Card>
  )
};

export default WindChart