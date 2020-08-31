import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//services
import { MapProvidersService } from '../../services/map-providers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() drawPointSelected = new EventEmitter();
  @Output() drawLineSelected = new EventEmitter();
  @Output() drawPolygonSelected = new EventEmitter();

  constructor(
    private providers: MapProvidersService
  ) { }

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

  drawPoint() {
    debugger
    this.drawPointSelected.emit();
  }
  drawLine() {
    this.drawLineSelected.emit();
  }
  drawPolygon() {
    this.drawPolygonSelected.emit();
  }



}
