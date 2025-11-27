import type { Coordinate } from "@/shared/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Coordinate | null;
  error: string | null;
  isLoading: boolean;
}
const useGeolocation = () => {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationData({
          coordinates: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Вы запретили доступ к геолокации. Включите разрешение в настройках браузера.";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "Невозможно получить данные о местоположении. Возможно, устройство не поддерживает GPS.";
            break;

          case error.TIMEOUT:
            errorMessage =
              "Истекло время ожидания геолокации. Попробуйте снова.";
            break;

          default:
            errorMessage = "Произошла неизвестная ошибка geolocation.";
            break;
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });

        console.error("Geo Error:", errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => getLocation(), []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeolocation;
