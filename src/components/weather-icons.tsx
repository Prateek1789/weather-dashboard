import { WEATHER_CONDITION_MAP } from "@/lib/weather.utils";

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  className?: string;
  size?: number;
}

const WeatherIcon = ({
  code,
  isDay = true,
  className = '',
  size = 20
}: WeatherIconProps) => {
  const condition = WEATHER_CONDITION_MAP[code] || WEATHER_CONDITION_MAP[3];
  const IconComponent = isDay ? condition.day : condition.night;

  return (
    <div
      role="image"
      aria-label={condition.label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <IconComponent size={size} aria-hidden />
    </div>
  )
};

export default WeatherIcon