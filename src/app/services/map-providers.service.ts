import { Injectable } from '@angular/core';

import Map  from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';

@Injectable({
  providedIn: 'root'
})
export class MapProvidersService {

  public map;
  public baseLayerToDiplay : any;

  public osm = new TileLayer ({
    visible: true,
    opacity: 0.8,
    source: new OSM(),
    maxZoom: 18
  })

  public stamenTerrain = new TileLayer ({
    visible: true,
    opacity: 0.8,
    source: new Stamen({
        layer: 'terrain'
    }),
    maxZoom: 18
  })
  
  public stamenWaterColor = new TileLayer ({
    visible: true,
    opacity: 0.7,
    source: new Stamen ({
      layer: 'watercolor'
    }),
    maxZoom: 17
  })

  constructor() { }

  initializeMap() {
    this.map = new Map ({
      target: 'map',
      layers: [this.osm],
      view: new View({
        center: [-360854.71, 5102324.49],
        zoom: 6,
      })
    })
  }

  changeToWatercolor() {
    //let capas = this.map.getLayers();
    //console.log(capas)
    this.map.removeLayer(this.osm);
    this.map.addLayer(this.stamenWaterColor)
  }
  changeToTerrain() {
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.addLayer(this.stamenTerrain)
  }
  changeToOsm() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.addLayer(this.osm);
  }

  // changeBaseLayer(source) {
  //   let oSource;
  //   let pixelRatio;
  //   var url;
  //   switch (this.baseLayerToDiplay) {
  //      case 'osm':
  //        this.map.addLayer(this)
  //   }
  // }

  

}
