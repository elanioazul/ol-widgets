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
  
  public stamenLabels = new TileLayer ({
    visible: true,
    opacity: 0.7,
    source: new Stamen ({
      layer: 'terrain-labels'
    }),
    maxZoom: 17
  })

  constructor() { }

  initializeMap() {
    this.map = new Map ({
      target: 'map',
      layers: [this.osm, this.stamenTerrain, this.stamenLabels ],
      view: new View({
        center: [-360854.71, 5102324.49],
        zoom: 6,
      })
    })
  }

}
