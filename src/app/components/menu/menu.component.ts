import { Component, OnInit } from '@angular/core';

//services
import { MapProvidersService } from '../../services/map-providers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private providers: MapProvidersService
  ) { }

  ngOnInit(): void {
  }

  switchToWatercolor() {
    debugger
    this.providers.changeToWatercolor();
  }
  switchToTerrain() {
    this.providers.changeToTerrain();
  }
  switchToOsm() {
    this.providers.changeToOsm();
  }
  switchToTopoMap() {
    this.providers.changeToTopoMap();
  }
  switchToVectorTileHillShade() {
    this.providers.changeToVectorTileHillShade();
  }

  switchToVectorTileArcGIS() {
    this.providers.changeToVectorTileArcGIS();
  }
  switchToVectorMapTilerEmbebed() {
    debugger
    this.providers.changeToVectorTileMapTilerEmbebedJson();
  }
  switchToGeoserverWMS() {
    this.providers.changeToPortalesGeoserverWMS();
  }
  switchToGeoserverWFS() {
    this.providers.changeToPortalesGeoserverWFS();
  }



}
