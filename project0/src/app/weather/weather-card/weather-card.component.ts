import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  @Input() weatherData : any[] = [];
  ngOnInit(){
    console.log("It is working");
    console.log(this.weatherData);
    console.log(this.weatherData.length);
  }
  showData(){
    console.log("showe data working");
    console.log(this.weatherData.length);
    for(let i in this.weatherData){
      console.log("i ==== " + i);
    }
    for(let i of this.weatherData){
      console.log("forOf ==== " + i.city);
    }
  }
}