import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { apikey } from './weatherKey';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  constructor(private http: HttpClient) {}
  cityName : string = "";
  zipcode : string = "";
  weatherObj  : any[] = [];

  lat : number = 0;
  lon : number = 0;
  getData(){  

    if(this.cityName === "" && this.zipcode === "") alert("You must enter a city namr or zipcode !");
    else{
      const url = this.cityName ? `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apikey}&units=imperial`:
                                  `https://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode},us&appid=${apikey}&units=imperial`;

  
      this.http.get(url).subscribe( { next : (data : any) => {
      
        const weatherDetail = {
          city : data.name,
          country  : data.sys.country,
          description : data.weather[0].description,
          feel : data.main.feels_like,
          humidity : data.main.humidity,
          icon : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, 
          latitude : data.coord.lat,       
          longitude : data.coord.lon,     
          pressure : data.main.pressure,        
          temp : data.main.temp,   
          windSpeed : data.wind.speed
        }
        this.weatherObj.unshift(weatherDetail);
        }, error : (err) => {
          alert("Make sure you enter a valid city name or a valid zipcode")
        }
      })
      this.cityName="";
      this.zipcode=""
    }
  }
  deleteWea(id :number){
    this.weatherObj.splice(id,1);
  }
}