import { Component, OnInit } from '@angular/core';

import Map  from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';

//controls 
import FullScreen from 'ol/control/FullScreen';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: any;

  public fullscreenbtn;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {

    let osm = new TileLayer ({
      visible: true,
      opacity: 0.8,
      source: new OSM(),
      maxZoom: 18
    })

    let stamenTerrain = new TileLayer ({
      visible: true,
      opacity: 0.8,
      source: new Stamen({
          layer: 'terrain'
      }),
      maxZoom: 18
    })
    
    let stamenLabels = new TileLayer ({
      visible: true,
      opacity: 0.7,
      source: new Stamen ({
        layer: 'terrain-labels'
      }),
      maxZoom: 17
    })


    this.fullscreenbtn = new FullScreen();


    this.map = new Map ({
      target: 'map',
      layers: [osm, stamenTerrain, stamenLabels ],
      view: new View({
        center: [-360854.71, 5102324.49],
        zoom: 6,
      }),
      controls: defaultControls().extend([
        this.fullscreenbtn
      ])
    })
  }



}
