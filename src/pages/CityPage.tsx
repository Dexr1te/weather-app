import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CurrentWeather from "@/components/widgets/CurrentWeather";
import HourlyTemperature from "@/components/widgets/HourlyTemperature";
import WeatherDetails from "@/components/widgets/WeatherDetails";
import WeatherForecast from "@/components/widgets/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { useFavoriteStore } from "@/store/store";
import { Star } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { addToFavorite, favoriteHistory, deleteFavorite } = useFavoriteStore();
  const isFavorite = favoriteHistory.some(
    (item) => item.name === params.cityName,
  );

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const cityObject = {
    name: params.cityName!,
    country: weatherQuery.data?.sys.country!,
    lat: lat,
    lon: lon,
  };

  const handleFavorite = () => {
    if (isFavorite) {
      deleteFavorite(cityObject.name);
    } else {
      addToFavorite(cityObject);
    }
  };

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          City: {params.cityName}, {weatherQuery.data?.sys.country}
        </h1>
        <div>
          <Star
            className={`w-8 cursor-pointer transition ${isFavorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
            onClick={handleFavorite}
          />
        </div>
      </div>
      {/* Current and Hourly Weather */}
      {weatherQuery.isLoading || forecastQuery.isLoading || !params.cityName ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Current and Hourly Weather */}
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <CurrentWeather data={weatherQuery.data!} />
              <HourlyTemperature data={forecastQuery.data!} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              {/* detials */}
              <WeatherDetails data={weatherQuery.data!} />
              {/* forecast */}
              <WeatherForecast data={forecastQuery.data!} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CityPage;
