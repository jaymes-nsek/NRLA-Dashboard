/**
 * Transport-layer DTO
 */
export interface WeatherResponse {
  coord: Coord;
  weather: WeatherCondition[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;        // Unix timestamp (seconds)
  sys: Sys;
  timezone: number; // Shift in seconds from UTC
  id: number;
  name: string;
  cod: number;
}

/**
 * Domain models
 */

export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherCondition {
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
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Rain {
  /** Rain volume for the last 1 hour (mm). */
  "1h"?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number; // Unix timestamp (seconds)
  sunset: number;  // Unix timestamp (seconds)
}
