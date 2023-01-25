import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent {
  // input data received from the parent component weather-card
  @Input() fcData : any[] = [];
}
