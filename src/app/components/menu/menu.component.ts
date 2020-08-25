import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//services
import { MapProvidersService } from '../../services/map-providers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //@Output() señal = new EventEmitter<boolean>();
  @Output() public lenghtSelected = new EventEmitter();
  lenght = false;
  @Output() public areaSelected = new EventEmitter();
  area = false;

  constructor(
    private providers: MapProvidersService
  ) { }

  lenghtSelection() {
    this.lenght = !this.lenght;
    this.lenghtSelected.emit(this.lenght)
  }
  areaSelection() {
    this.area = !this.lenght;
    this.areaSelected.emit(this.area)
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
