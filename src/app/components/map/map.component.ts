import { Component, OnInit } from '@angular/core';


import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

//services
import { MapProvidersService } from '../../services/map-providers.service';


//controls 
import FullScreen from 'ol/control/FullScreen';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private providers: MapProvidersService
  ) { }

  ngOnInit(): void {
    this.providers.initializeMap();
    this.providers.getInfoByClicking();
    this.addControlsToMap();
  }

 

  addControlsToMap() {
    let fullScreenControl = new FullScreen();
    let overviewControl = new OverviewMap({
      layers: [
        new TileLayer({
            source: new OSM({
                'url': 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            })
        })
      ],
      collapsed: false,
      tipLabel: 'Mapa de referencia'
    });
    this.providers.map.addControl(fullScreenControl);
    this.providers.map.addControl(overviewControl);
  }

  



}
