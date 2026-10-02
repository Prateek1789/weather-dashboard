import { useMemo } from "react";
import { useWeatherStore } from "@/store/store";

import { 
	Line, 
	LineChart, 
	XAxis,
	YAxis 
} from "recharts";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "./ui/card";

import { 
	ChartContainer, 
	ChartTooltip, 
	ChartTooltipContent,
	type ChartConfig
} from "./ui/chart";

import { ChartLine } from "lucide-react";

const chartConfig = {
	actual: {
		label: 'Actual',
		color: 'oklch(87.9% 0.169 91.605)',
	},
	feelsLike: {
		label: 'Feels Like',
		color: 'oklch(76.9% 0.188 70.08)',
	},
} satisfies ChartConfig;

const HourlyTempChart = () => {
	const selectedTempUnit = useWeatherStore(state => state.unitSystem);
	const weatherData = useWeatherStore(state => state.weatherData);

	const unit = selectedTempUnit === 'metric' ? 'cel' : 'feh';
	const domainRange = { 'cel': [0, 60], 'feh': [32, 140] };

	const formatedData = useMemo(() => {
		return weatherData?.hourly.map((item) => ({
			time: new Date(item.time).toLocaleTimeString(
				'en-us', 
				{ hour: 'numeric', hour12: true }
			),
			actual: item.temp[unit],
			feelsLike: item.feels_like[unit]
		}));
	}, [unit, weatherData?.hourly]);

	return (
		<Card className="w-full h-70 p-4 xl:p-5 rounded-2xl justify-between bg-gray-50 dark:bg-card">
			<CardHeader className="flex items-center justify-between px-0">
				<CardTitle className="text-xs uppercase tracking-widest">Thermal Trajectory</CardTitle>
				<ChartLine size={18} color="#a1a1a1" aria-hidden="true" />
			</CardHeader>
			<CardContent className="h-full w-full pb-1">
				<ChartContainer className="w-full h-full max-h-0 min-h-full" config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={formatedData}
					>
						<XAxis 
							dataKey={"time"}
							tickLine={false}
							axisLine={false}
							height={18}
						/>
						<YAxis 
							domain={domainRange[unit]} 
							tickLine={false} 
							axisLine={false}
							width={unit === 'cel' ? 18 : 22} 
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Line 
							dataKey={`actual`}
							type={"monotone"}
							stroke="var(--color-actual)"
							strokeWidth={2}
						/>
						<Line 
							dataKey={`feelsLike`}
							type={"monotone"}
							stroke="var(--color-feelsLike)"
							strokeWidth={2}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
};

export default HourlyTempChart