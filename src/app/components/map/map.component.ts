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



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public draw;
  public whatToDraw;
  public wantToMeasureLenght;
  public wantToMeasureArea;

  


  constructor(
    private providers: MapProvidersService
  ) { }

  letsMeasureLenght(e) {
    this.wantToMeasureLenght = true;
  }
  letsMeasureArea(e) {
    this.wantToMeasureArea = true;
  }

  ngOnInit(): void {
    this.providers.initializeMap();
    this.addControlsToMap();
    this.drawMultilineGeometry();
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

  drawMultilineGeometry() {
        /**
     * Currently drawn feature.
     * @type {import("../src/ol/Feature.js").default}
     */
    let sketch;

    /**
     * The help tooltip element.
     * @type {HTMLElement}
     */
    let helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {Overlay}
     */
    let helpTooltip;

    /**
     * The measure tooltip element.
     * @type {HTMLElement}
     */
    let measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {Overlay}
     */
    let measureTooltip;

    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    let continuePolygonMsg = 'Click to continue drawing the polygon';

    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    let continueLineMsg = 'Click to continue drawing the line';
    /**

    * Handle pointer move.
    * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
    */

    let pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      var helpMsg = 'Click to start drawing';
    
      if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }
    
      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);
    
      helpTooltipElement.classList.remove('hidden');
    }

    this.providers.map.on('pointermove', pointerMoveHandler);
    this.providers.map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });
    

      /**
    * Format length output.
    * @param {LineString} line The line.
    * @return {string} The formatted length.
    */
    let formatLength = function (line) {
      let length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };

      /**
    * Format area output.
    * @param {Polygon} polygon The polygon.
    * @return {string} Formatted area.
    */
    let formatArea = function (polygon) {
      var area = getArea(polygon);
      var output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    };

  }

  addInteraction() {
    let source = new VectorSource({});
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
    this.createHelpTooltip();

    let listener;
    this.draw.on('drawstart', function (e) {
      // set sketch
      this.sketch = e.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      let tooltipCoord = e.coordinate;

      this.listener = this.sketch.getGeometry().on('change', function (evt) {
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
      unByKey(listener);
    });

  }

  createMeasureTooltip() {

  }
  createHelpTooltip() {

  }

  



}
