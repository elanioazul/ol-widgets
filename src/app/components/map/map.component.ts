import { Component, OnInit } from '@angular/core';

import Map  from 'ol/Map';
//import TileLayer from 'ol/layer/Tile';
import { Tile as TileLayer, Vector as VectorLayer, Tile, Layer } from 'ol/layer.js'
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Stamen from 'ol/source/Stamen';

//controls 
import FullScreen from 'ol/control/FullScreen';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';
import LayerSwitcher from 'ol-layerswitcher/src/ol-layerswitcher.js';
import LayerGroup from 'ol/layer/Group';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map;
  // osm: any = {};
  // stamen: any = {};
  public layers;
  public fullscreenbtn;
  public layerswitcher;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {

    // this.osm = new TileLayer ({
    //   title: 'OSM',
    //   type: 'base',
    //   visible: true,
    //   source: new OSM(),
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    //   maxZoom: 18
    // })
    // this.stamen = new TileLayer ({
    //   title: 'Terrain', 
    //   type: 'base',
    //   visible: false,
    //   source: new Stamen({
    //       layer: 'terrain'
    //   })
    // })

    this.layerswitcher = new LayerSwitcher();
    this.fullscreenbtn = new FullScreen();

    this.layers = [
      new LayerGroup({
        'title': 'Base maps',
        type: 'base',
        coimbine: true,
        visible: false,
        layers: [
          new Tile({
            source: new Stamen({
              layer: 'watercolor'
            })
          }),
          new Tile({
            source: new Stamen({
              layer: 'terrain'
            })
          })
        ]
      })
    ]

    this.map = new Map ({
      target: 'map',
      layers: this.layers,
      view: new View({
        center: [-360854.71, 5102324.49],
        zoom: 6,
      }),
      controls: defaultControls().extend([
        this.layerswitcher, this.fullscreenbtn
      ])
    })
  }



}
