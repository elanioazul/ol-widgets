import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawComponent } from './widgets/draw/draw.component';
import { MeasureComponent } from './widgets/measure/measure.component';
import { MarkerComponent } from './widgets/marker/marker.component';
import { MapComponent } from './components/map/map.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    MeasureComponent,
    MarkerComponent,
    MapComponent,
    TopbarComponent,
    LeftbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
