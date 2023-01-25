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
  // City name or zip code, use either one to get the current time weather data
  cityName : string = "";
  zipcode : string = "";
  // store the current weather data and passing to the child component 
  weatherObj  : any[] = [];
  // To store latitude and longitude data which going to use in the future 
  lat : number = 0;
  lon : number = 0;
  getData(){  

    if(this.cityName === "" && this.zipcode === "") alert("You must enter a city namr or zipcode !");
    else{
      // Determine which url going to use depends on user input city name or zip code
      const url = this.cityName ? `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apikey}&units=imperial`:
                                  `https://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode},us&appid=${apikey}&units=imperial`;

      // API call 
      this.http.get(url).subscribe( { next : (data : any) => {
        // Store needed weather data in an object
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
        // unshift the object the weatherObj array
        this.weatherObj.unshift(weatherDetail);
        }, error : (err) => {
          alert("Make sure you enter a valid city name or a valid zipcode")
        }
      })
      this.cityName="";
      this.zipcode=""
    }
  }
  // Delete a particular weather card component by the index which store in the weatherObj array
  deleteWea(id :number){
    this.weatherObj.splice(id,1);
  }

  // Delete all weather card components
  deleteAll(){
    console.log("Delete all")
    this.weatherObj.length = 0;
  }
}