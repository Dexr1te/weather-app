import { weatherApi } from "@/api/weather";
import type { Coordinate } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinate) => ["weather", coords] as const,
  forecast: (coords: Coordinate) => ["forecast", coords] as const,
  location: (coords: Coordinate) => ["location", coords] as const,
  search: (query: string) => ["search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherApi.getForecast(coordinates) : null),
    enabled: !!coordinates,
    retry: false,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinate | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useSearchLocationQuery(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherApi.searchLocation(query),
    enabled: query.length >= 3,
  });
}
