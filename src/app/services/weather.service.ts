import {Inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {WeatherResponse} from '../../models/weather-response.model';
import {APP_CONFIG} from '../../tokens/app-config.token';
import {AppConfig} from '../../models/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends BaseService {
  constructor( @Inject(APP_CONFIG) public config: AppConfig) {
    super();
  }

  getWeatherInfo(geoData: GeoData): Observable<WeatherResponse> {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = this.config.openWeatherAccessToken;

    const url = `${baseUrl}?lat=${geoData.lat}&lon=${geoData.lon}&appid=${apiKey}&units=metric`;

    return this.get<WeatherResponse>(url);
  }
}
