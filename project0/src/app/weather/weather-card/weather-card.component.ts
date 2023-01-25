import { Component, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apikey } from '../weatherKey';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  constructor(private http: HttpClient) {}
  // input data from the parent component weather, which use to present the current weather data 
  @Input() weatherData : any = {};
  @Input() id :number = -1;
  // Forecast 
  forecastData : object[] = [];
  showInfo = false;
  showText = "+ Show forecast info"; 
  // Air pollution
  showAirP = false;
  pollutionText = "+ Show air pollution info";
  airData : object = {};

    // Delete component, output to weather component 
  
  @Output() delete = new EventEmitter<number>();

  deleteObj( id :number){
    this.delete.emit(id);
  }
  // After button(get current data) has been clicked, this function makes an API call and collect data
  showForecast(){
    // change the status and text 
    this.showInfo = !this.showInfo;
    this.showText = this.showInfo? "- Hide forecast info" : "+ Show forecast info"
    // If the status is false, remove all the forecast data.
    if(!this.showInfo) {
      this.forecastData.length = 0;
    }
    else{
      const fUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.weatherData.latitude}&lon=${this.weatherData.longitude}&&appid=${apikey}&units=imperial`;
      this.http.get(fUrl).subscribe( (data : any) => {
        // the response data contains 40 forecast data, but I only need 6 out of them.
        for(let i=0 ; i<6; i++ ){
          const forecastDataObj = {
          timeText : data.list[i].dt_txt,
          temp : data.list[i].main.temp,
          icon :  `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
          }     
          this.forecastData.push(forecastDataObj);
        }
      })
    } 
  }
  showPollution(){
    this.showAirP = !this.showAirP;
    this.pollutionText = this.showAirP? "- Hide air pollution info" : "+ Show air pollution info";
    const airUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${this.weatherData.latitude}&lon=${this.weatherData.longitude}&appid=${apikey}`
    this.http.get(airUrl).subscribe( (data : any) => {
      this.airData = data.list[0].components;
    })
  }
}