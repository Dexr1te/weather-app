import { Card, CardContent, CardTitle } from "../ui/card";
import type { CurrentWeatherResponse } from "@/shared/types";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";
type Props = {
  data: CurrentWeatherResponse;
};

const WeatherDetails = (props: Props) => {
  const { wind, main, sys } = props.data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm: a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-orange-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card className="overflow-hidden">
      <div className="p-6 space-y-2">
        <CardTitle>Weather Details</CardTitle>
        <CardContent className="px-0">
          <div className="grid gap-6 sm:grid-cols-2">
            {details.map((detail) => {
              return (
                <div
                  key={detail.title}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <detail.icon className={`h-5 w-5 ${detail.color}`} />
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {detail.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WeatherDetails;
