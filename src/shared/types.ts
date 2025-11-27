export interface Coordinate {
  lat: number;
  lon: number;
}

export interface CurrentWeatherResponse {
  coord: Coordinate;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  rain?: Rain; // ? — потому что может отсутствовать
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number; // Иногда отсутствуют
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Rain {
  ["1h"]?: number; // ключ начинается с цифры → нужна строка
  ["3h"]?: number; // иногда бывает 3h
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: ForecastCity;
}

export interface ForecastItem {
  dt: number;
  main: ForecastMain; // аналог MainWeather, но со своими полями
  weather: Weather[]; // используется твой Weather
  clouds: Clouds; // используется твой Clouds
  wind: Wind; // используется твой Wind
  visibility: number;
  pop: number; // вероятность осадков
  rain?: Rain3h; // отдельный тип для прогноза
  sys: ForecastSys;
  dt_txt: string;
}

export interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain3h {
  "3h": number;
}

export interface ForecastSys {
  pod: "d" | "n"; // day / night
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: Coordinate; // используется твой Coordinate
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
