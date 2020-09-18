import { Injectable, inject, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import GeoJSON from 'ol/format/GeoJSON';
//consuming vector tiles
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
//consuming vector layers from geoserver
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
//vector layer styling
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
//consuming images from geoserver
import ImageWMS from 'ol/source/ImageWMS';
import { Image as ImageLayer } from 'ol/layer.js';
//mapbox specification style https://github.com/openlayers/ol-mapbox-style
import { apply } from 'ol-mapbox-style';
import Text from 'ol/style/Text';
import { stringify } from '@angular/compiler/src/util';
//GeoStyler sld to OL
//import SLDParser from "geostyler-sld-parser";
import OpenLayersParser from "geostyler-openlayers-parser";
//Mejora de Geostyler parsing icons base64
import {MySldParser} from '../model/MySldParser'
//geostyler-geoserver-sld-parser that extends the current sld-parser and adds parsing of the geoserver vendor options, https://github.com/geostyler/geostyler/issues/1118
import SLDParser from "@bayer/geostyler-geoserver-sld-parser";




@Injectable({
  providedIn: 'root'
})
export class MapProvidersService {

  public map;

  public osm = new TileLayer({
    visible: true,
    opacity: 0.8,
    source: new OSM(),
    maxZoom: 18
  })


  public vectorTileArcGISpbf = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      //url: 'https://tile.nextzen.org/tilezen/vector/v1/256/all/{z}/{x}/{y}.mvt?api_key=PC7P8wB2R0G-uaFxASYVxw'
      url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    })
  })


  //manzanas vectorTileLayer
  public manzanasVectorTileSource = new VectorTileSource({
    maxZoom: 20,
    format: new MVT({
      idProperty: 'iso_a3',
    }),
    url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' +
      'visor-agosto:MANZANA' +
      '@EPSG%3A' + '900913' + '@pbf/{z}/{x}/{-y}.pbf'
  });

  public manzanasBasicStyle = new Style({
    fill: new Fill({
      color: '#e0a53f'
    }),
    stroke: new Stroke({
      color: '#0981ad',
      width: 1
    })
  })

  public manzanasVectorTileLayer = new VectorTileLayer({
    declutter: true,
    source: this.manzanasVectorTileSource,
    style: this.manzanasBasicStyle
  })

  public geoformasVectorTileLayer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
      maxZoom: 15,
      format: new MVT({
        idProperty: 'iso_a3',
      }),
      url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' +
        'visor-agosto:ge.geomorf_cyl_ad_di_s' +
        '@EPSG%3A' + '900913' + '@pbf/{z}/{x}/{-y}.pbf'
    })
  });

  public geoformasLinesVectorTileLayer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
      maxZoom: 15,
      format: new MVT({
        idProperty: 'iso_a3',
      }),
      url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' +
        'visor-agosto:ge.geomorf_cyl_ad_di_l' +
        '@EPSG%3A' + '900913' + '@pbf/{z}/{x}/{-y}.pbf'
    })
  });

  public geoformasPointsVectorTileLayer = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
      maxZoom: 15,
      format: new MVT({
        idProperty: 'iso_a3',
      }),
      url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' +
        'visor-agosto:ge.geomorf_cyl_ad_di_p' +
        '@EPSG%3A' + '900913' + '@pbf/{z}/{x}/{-y}.pbf'
    })
  });



  constructor(private http: HttpClient) { }

  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [this.osm],
      view: new View({
        center: [-696799.949848, 5091623.328132],
        zoom: 11,
      })
    })
  }


  changeToOsm() {
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.osm);
  }





  changeToVectorTileArcGIS() {
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.vectorTileArcGISpbf);
  }

  changeToVectorTileMapTilerEmbebedJson() {
    this.map.removeLayer(this.osm)
    this.map.removeLayer(this.vectorTileArcGISpbf)
    this.map.removeLayer(this.manzanasVectorTileLayer)
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    apply(
      this.map,
      //'../../assets/vectorTileStyles/Streets_try1.json'
      'https://api.maptiler.com/maps/b3265770-0173-4415-909d-264ef9934779/style.json?key=TihHLtBNpTt2U1j9teAe'
    )
    //olms.apply(this.map.addLayer(), styleJson);

  }




  changeToManzanasGeoserverVectorTile() {
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.manzanasVectorTileLayer);


    this.manzanasVectorTileSource.on('tileloadend', function (evt) {
      let tilemia = evt.tile;
      console.log(tilemia);
    });

    //45001 features segun qgis count aggregate functions y 371 segun count_distinct( "INE_MUN" )

    let manzanasStyleFunction = function (feature, resolution) {
      let id = feature.getProperties().INE_MUN;
      let textSize = 10 / resolution;
      let textStyle = new Text({
        font: textSize + 'px Calibri,sans-serif',
        overflow: true,
        fill: new Fill({
          color: '#000',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3,
        }),
        text: stringify(id)
      });
      if (id >= 9001 && id < 9500) {
        return new Style({
          fill: new Fill({
            color: '#adc24c',
          }),
          stroke: new Stroke({
            color: 'black',
            width: 2
          }),
          text: textStyle
        })
      } else if (id > 9500) {
        return new Style({
          fill: new Fill({
            color: '#ee5f4c'
          }),
          stroke: new Stroke({
            color: 'blue',
            width: 2
          }),
          text: textStyle
        })
      }
    }

    this.manzanasVectorTileLayer.setStyle(manzanasStyleFunction);
  }

  changeToCallejeroBurgosJsonStyle() {
    this.map.removeLayer(this.osm)
    this.map.removeLayer(this.vectorTileArcGISpbf)
    this.map.removeLayer(this.manzanasVectorTileLayer)
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    apply(
      this.map,
      '../../assets/vectorTileStyles/burgos-callejero-apelo.json'
    )
  }

  changeToGeoformasJsonStyle() {
    this.map.removeLayer(this.osm)
    this.map.removeLayer(this.vectorTileArcGISpbf)
    this.map.removeLayer(this.manzanasVectorTileLayer)
    this.map.removeLayer(this.geoformasVectorTileLayer)
    this.map.removeLayer(this.geoformasLinesVectorTileLayer)
    this.map.removeLayer(this.geoformasPointsVectorTileLayer)
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    apply(
      this.map,
      '../../assets/vectorTileStyles/geoformas-apelo.json'
    )
  }

  changeToGeoformasGeostylerSldToOL() {
    this.map.removeLayer(this.osm)
    this.map.removeLayer(this.vectorTileArcGISpbf)
    this.map.removeLayer(this.manzanasVectorTileLayer)
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach(layer => {
      this.map.removeLayer(layer)
    })
    //this.map.addLayer(this.geoformasVectorTileLayer);
    this.map.addLayer(this.geoformasLinesVectorTileLayer);
    //this.map.addLayer(this.geoformasPointsVectorTileLayer);

    /*
    const sldParserPolygon = new SLDParser();
    const olParserPolygon = new OpenLayersParser();
    let a: any;
    this.http.get('../../assets/vectorTileStyles/geoformas.sld', {responseType: 'text'}).subscribe((success) => {
      a = success;
      sldParserPolygon.readStyle(a).then((geostylerStyle: any) => {
        olParserPolygon.writeStyle(geostylerStyle).then((olStyle) => {
          this.geoformasVectorTileLayer.setStyle(olStyle);
        });
      });
    })
    */
    
    const sldParserLine = new SLDParser();
    const olParserLine = new OpenLayersParser();
    let b: any;
    this.http.get('../../assets/vectorTileStyles/geoformas-lines.sld', {responseType: 'text'}).subscribe((success) => {
      b = success;
      sldParserLine.readStyle(b).then((geostylerStyle: any) => {
        debugger
        olParserLine.writeStyle(geostylerStyle).then((olStyle) => {
          debugger
          this.geoformasLinesVectorTileLayer.setStyle(olStyle);
        });
      });
    })

    /*
    const sldParserPoint = new MySldParser();
    const olParserPoint = new OpenLayersParser();
    let c: any;
    this.http.get('../../assets/vectorTileStyles/geoformas-points_2.sld', {responseType: 'text'}).subscribe((success) => {
      c = success;
      sldParserPoint.readStyle(c).then((geostylerStyle: any) => {
        debugger
        olParserPoint.writeStyle(geostylerStyle).then((olStyle) => {
          debugger
          this.geoformasPointsVectorTileLayer.setStyle(olStyle);
        });
      });
    })
    */

  }









}
