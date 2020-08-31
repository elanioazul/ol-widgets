import { Component, OnInit } from '@angular/core';


import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

//services
import { MapProvidersService } from '../../services/map-providers.service';


//controls 
import FullScreen from 'ol/control/FullScreen';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';

//draw
import {Modify, Snap} from 'ol/interaction';
import Draw from 'ol/interaction/Draw'
import { Vector as VectorSource} from 'ol/source';
import { Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import GeometryType from 'ol/geom/GeometryType';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  //let geom: GeometryType = 'Point'

  constructor(
    private providers: MapProvidersService
  ) { }

  ngOnInit(): void {
    this.providers.initializeMap();
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

  drawPoint() {
    debugger
    let source = new VectorSource();
    let vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    this.providers.map.addLayer(vector);
    let modify = new Modify({source: source})
    this.providers.map.addInteraction(modify);
    let draw;
    let snap;
    let addInteraction = () => {
      draw = new Draw({
        source: source,
        type: GeometryType.POINT
      });
      this.providers.map.addInteraction(draw);
      snap = new Snap({source: source});
      this.providers.map.addInteraction(snap);
    }
  }

  drawLine() {
    debugger
    let source = new VectorSource();
    let vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    this.providers.map.addLayer(vector);
    let modify = new Modify({source: source})
    this.providers.map.addInteraction(modify);
    let draw;
    let snap;
    let addInteraction = () => {
      draw = new Draw({
        source: source,
        type: GeometryType.LINE_STRING
      });
      this.providers.map.addInteraction(draw);
      snap = new Snap({source: source});
      this.providers.map.addInteraction(snap);
    }
  }

  drawPolygon() {
    debugger
    let source = new VectorSource();
    let vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    this.providers.map.addLayer(vector);
    let modify = new Modify({source: source})
    this.providers.map.addInteraction(modify);
    let draw;
    let snap;
    let addInteraction = () => {
      draw = new Draw({
        source: source,
        type: GeometryType.POLYGON
      });
      this.providers.map.addInteraction(draw);
      snap = new Snap({source: source});
      this.providers.map.addInteraction(snap);
    }
  }



}
