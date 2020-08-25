import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//services
import { MapProvidersService } from '../../services/map-providers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() lenghtSelected = new EventEmitter();
  @Output() areaSelected = new EventEmitter();

  constructor(
    private providers: MapProvidersService
  ) { }

  lenghtSelection() {
    this.lenghtSelected.emit()
  }
  areaSelection() {
    this.areaSelected.emit()
  }

  ngOnInit(): void {
  }

  switchToWatercolor() {
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
  switchToVectorTileSat() {
    this.providers.changeToVectorTileSat();
  }
  switchToVectorTileArcGIS() {
    this.providers.changeToVectorTileArcGIS();
  }



}
