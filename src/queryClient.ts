// src/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // данные считаются свежими 5 минут
      staleTime: 5 * 60 * 1000,

      // храним в кеше 10 минут после отписки
      gcTime: 10 * 60 * 1000,

      // без автоматических ретраев (удобно для подсчёта X)
      retry: false,

      // не делаем скрытых рефетчей
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});
