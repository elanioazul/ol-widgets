import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapProvidersService } from './services/map-providers.service'

import { AppComponent } from './app.component';
import { DrawComponent } from './widgets/draw/draw.component';
import { MeasureComponent } from './widgets/measure/measure.component';
import { MarkerComponent } from './widgets/marker/marker.component';
import { LayerSwitcherComponent } from './widgets/layer-switcher/layer-switcher.component';
import { MapComponent } from './components/map/map.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    MeasureComponent,
    MarkerComponent,
    LayerSwitcherComponent,
    MapComponent,
    TopbarComponent,
    MenuComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [MapProvidersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
