import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pollution',
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.css']
})
export class PollutionComponent {
  //input data received from the parent component weather-card
  @Input() airPollData : any = {};
}
