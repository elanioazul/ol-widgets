import { Component, OnInit, Input, Output } from '@angular/core';


import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

//services
import { MapProvidersService } from '../../services/map-providers.service';


//controls 
import FullScreen from 'ol/control/FullScreen';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';

//draw
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import {getArea, getLength} from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import {unByKey} from 'ol/Observable';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public draw;
  public whatToDraw;
  public wantToMeasureLenght = false;
  public wantToMeasureArea = false;

  
  public sketch;
  /**
   * The help tooltip element.
   * @type {HTMLElement}
   */
  public helpTooltipElement;
  /**
   * Overlay to show the help messages.
   * @type {Overlay}
   */
  public helpTooltip;
  /**
   * The measure tooltip element.
   * @type {HTMLElement}
   */
  public measureTooltipElement;
  /**
   * Overlay to show the measurement.
   * @type {Overlay}
   */
  public measureTooltip;
  /**
   * Message to show when the user is drawing a polygon.
   * @type {string}
   */
  public continuePolygonMsg = 'Click to continue drawing the polygon';
  /**
   * Message to show when the user is drawing a line.
   * @type {string}
   */
  public continueLineMsg = 'Click to continue drawing the line';
    /**

    * Handle pointer move.
    * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
    */

   private listener;


  constructor(
    private providers: MapProvidersService
  ) { }

  ngOnInit(): void {
    this.providers.initializeMap();
    this.addControlsToMap();
  }

  letsMeasureLenght() {
    debugger
    this.wantToMeasureLenght = true;
    this.drawPointer();
    this.addInteraction();
  }

  letsMeasureArea() {
    debugger
    this.wantToMeasureArea = true;
    this.drawPointer();
    this.addInteraction();
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


  //3 funciones manejadoras a continuación

  public pointerMoveHandler = function (evt) {
    debugger
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    var helpMsg = 'Click to start drawing';
  
    if (this.sketch) {
      var geom = this.sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = this.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = this.continueLineMsg;
      }
    }
    debugger
    this.createHelpTooltip();
    debugger
    //document.getElementsByClassName('ol-tooltip');
    this.helpTooltipElement.innerHTML = helpMsg;
    this.helpTooltip.setPosition(evt.coordinate);
    this.helpTooltipElement.classList.remove('hidden');
  }

  public formatLength = function (line) {
    let length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  };

  public formatArea = function (polygon) {
    var area = getArea(polygon);
    var output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };


  drawPointer() {
    this.createHelpTooltip();
    debugger
    this.providers.map.on('pointermove', this.pointerMoveHandler(event));
    debugger
    this.providers.map.getViewport().addEventListener('mouseout', function () {
      this.helpTooltipElement.classList.add('hidden');
    });
    
  }

  addInteraction() {
    let source = new VectorSource({});
    let vectortoDrawAndMeasure = new VectorLayer({
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

    this.providers.map.addLayer(vectortoDrawAndMeasure);
    
    if(this.wantToMeasureLenght == true) {
      this.whatToDraw = 'LineString'
    } else if (this.wantToMeasureArea == true) {
      this.whatToDraw = 'Polygon'
    }

    this.draw = new Draw({
      source: source,
      type: this.whatToDraw,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });
    this.providers.map.addInteraction(this.draw);

    this.createMeasureTooltip();


    
    this.draw.on('drawstart', (e) => {
      
      // set sketch
      this.sketch = e.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      let tooltipCoord = e.coordinate;

      this.listener = this.sketch.getGeometry().on('change',  (evt) => {
        let geom = evt.target;
        let output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = this.formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        this.measureTooltipElement.innerHTML = output;
        this.measureTooltip.setPosition(tooltipCoord);
      });
    });

    this.draw.on('drawend', function () {
      this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      this.measureTooltip.setOffset([0, -7]);
      // unset sketch
      this.sketch = null;
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null;
      this.createMeasureTooltip();
      unByKey(this.listener);
    });

  }

  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: OverlayPositioning.CENTER_LEFT
    });
    this.providers.map.addOverlay(this.measureTooltip);
  }

  createHelpTooltip() {
    debugger
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'ol-tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: OverlayPositioning.CENTER_CENTER
    });
    this.providers.map.addOverlay(this.helpTooltip);
  }



  



}
