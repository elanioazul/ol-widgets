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

  switchToOsm() {
    this.providers.changeToOsm();
  }


  switchToVectorTileArcGIS() {
    this.providers.changeToVectorTileArcGIS();
  }
  switchToVectorMapTilerEmbebed() {
    this.providers.changeToVectorTileMapTilerEmbebedJson();
  }

  switchToGeoserverManzanasVectorTile() {
    this.providers.changeToManzanasGeoserverVectorTile();
  }

  switchToManzanasMapboxStyle() {
    this.providers.changeToManzanasJsonStyle();
  }

  switchToGeoformasMapboxStyle() {
    this.providers.changeToGeoformasJsonStyle();
  }

  switchToGeoformasGeoStylerOL() {
    this.providers.changeToGeoformasGeostylerOL();
  }





}
