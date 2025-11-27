import type { ForecastResponse } from "@/shared/types";
import { Card, CardContent, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

type Props = {
  data: ForecastResponse;
};

type ForecaseDataType = {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: number;
};

const WeatherForecast = (props: Props) => {
  const dailyForecast = props.data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "EEE, MMM d");

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min,
        );
        acc[date].temp_max = Math.min(
          acc[date].temp_max,
          forecast.main.temp_max,
        );
      }

      return acc;
    },
    {} as Record<string, ForecaseDataType>,
  );
  return (
    <Card className="overflow-hidden">
      <div className="p-6 space-y-2">
        <CardTitle>5 Days Forecast</CardTitle>
        <CardContent className="px-0">
          <div className="grid gap-6">
            {Object.entries(dailyForecast).map(([date, item]) => (
              <div
                className=" min-w-0 flex items-center justify-between gap-3 rounded-lg border p-4"
                key={item.date}
              >
                <div>
                  <div className="font-bold leading-none">{date}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.weather.description}
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="flex text-blue-500">
                    <ArrowDown className="w-5" />
                    {Math.round(item.temp_min)}°
                  </div>
                  <div className="flex text-rose-500">
                    {Math.round(item.temp_max)}°<ArrowUp className="w-5" />
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-sm flex items-center gap-1">
                    <Droplets className="w-5 text-blue-400" />
                    {item.humidity}%
                  </div>
                  <div className="text-sm flex items-center gap-1">
                    <Wind className="w-5 text-blue-400" />
                    {item.wind}m/s
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WeatherForecast;
