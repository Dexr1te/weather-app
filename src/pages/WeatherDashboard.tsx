import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CurrentWeather from "@/components/widgets/CurrentWeather";
import { FavoriteCities } from "@/components/widgets/FavoriteCities";
import HourlyTemperature from "@/components/widgets/HourlyTemperature";
import WeatherDetails from "@/components/widgets/WeatherDetails";
import WeatherForecast from "@/components/widgets/WeatherForecast";
import useGeolocation from "@/hooks/useGeolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertCircleIcon, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const locatioQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" /> Enable location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" /> Enable location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const currentLocation = locatioQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <RefreshCcw className={`mr-2 h-4 w-4`} /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="space-y-4">
      {/* Favorite Cities */}
      <FavoriteCities />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Location</h1>
        <h1 className="text-3xl font-bold tracking-tight">
          City: {currentLocation?.name}
        </h1>
        <Button
          variant={"outline"}
          size={"icon"}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          onClick={handleRefresh}
        >
          <RefreshCcw
            className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      {/* Current and Hourly Weather */}
      {weatherQuery.isLoading || forecastQuery.isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Current and Hourly Weather */}
          <div className="grid gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <CurrentWeather
                data={weatherQuery.data!}
                locationName={currentLocation}
              />
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

export default WeatherDashboard;
