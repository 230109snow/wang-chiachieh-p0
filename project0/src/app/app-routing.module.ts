import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path : 'weather',
    component : WeatherComponent
  },
  {
    path : 'about',
    component : AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
