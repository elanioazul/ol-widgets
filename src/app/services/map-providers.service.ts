import { Injectable, inject, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import Map  from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';

import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';
import TileJSON from 'ol/source/TileJSON';
import GeoJSON from 'ol/format/GeoJSON';
//consuming vector tiles
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
//reaching vector tiles features
import * as olPixel from 'ol/pixel';
import Feature from 'ol/Feature';
//consuming vector layers from geoserver
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { bbox as bboxStrategy} from 'ol/loadingstrategy';
//vector layer styling
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
//consuming images from geoserver
import ImageWMS from 'ol/source/ImageWMS';
import { Image as ImageLayer } from 'ol/layer.js';
//mapbox specification style https://github.com/openlayers/ol-mapbox-style
import  { apply }  from 'ol-mapbox-style';
import Text from 'ol/style/Text';
import { stringify } from '@angular/compiler/src/util';




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

  
  public stamenWaterColor = new TileLayer ({
    visible: true,
    opacity: 0.7,
    source: new Stamen ({
      layer: 'watercolor'
    }),
    maxZoom: 17
  })

  public topMap = new TileLayer({
    source: new XYZ({
      url:
        'https://tile.opentopomap.org/{z}/{x}/{y}.png',
      attributions: 'topoMap',
      crossOrigin: 'anonymous'
    })
  })

  public vectorTileMapTilerHillShades = new TileLayer ({
    source: new TileJSON ({
      url: 'https://api.maptiler.com/tiles/hillshades/tiles.json?key=TihHLtBNpTt2U1j9teAe',
      tileSize: 256,
      crossOrigin: 'anonymous'
    })

  })

  public vectorTileArcGISpbf = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      //url: 'https://tile.nextzen.org/tilezen/vector/v1/256/all/{z}/{x}/{y}.mvt?api_key=PC7P8wB2R0G-uaFxASYVxw'
      url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    })
  })

  public portalesGeoserverWFS = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          'http://localhost:8080/geoserver/visor-agosto/wfs?service=WFS&' +
          'version=2.0.0&request=GetFeature&typeName=visor-agosto:portales-callejero-burgos&' +
          'outputformat=application/json'
        );
      },
      strategy: bboxStrategy,
    }),
    style: new Style({
      fill: new Fill({
            color: 'rgba(0, 0, 255, 0.5)',
      }),
      stroke: new Stroke({
        color: 'rgba(255, 0, 255, 1.0)',
        width: 2
      })
    })
  })

  public portalesGeoserverWMS = new ImageLayer({
    extent: [-858540.701699, 74847.915915, -145536.101855, 5365267.889393],
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/wms',
      params: {
          'LAYERS': 'portales-callejero-burgos',
          'FORMAT': 'image/png'
      },
      ratio: 1,
      serverType: 'geoserver',
    }),
    opacity: 0.8,
  })


  public manzanasVectorTileSource = new VectorTileSource({
    maxZoom: 15,
    format: new MVT({
      idProperty: 'iso_a3',
    }),
    url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' +
          'visor-agosto:manzanas-callejero-burgos' +
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





  constructor(private http:HttpClient) { }

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
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.stamenWaterColor);
       
  }

  changeToOsm() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.osm);
  }

  changeToTopoMap() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.topMap);
  }

  changeToVectorTileHillShade() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.vectorTileMapTilerHillShades);
  }



  changeToVectorTileArcGIS() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.vectorTileArcGISpbf);
  }

  changeToVectorTileMapTilerEmbebedJson() {
    this.map.removeLayer(this.stamenWaterColor)
    this.map.removeLayer(this.osm)
    this.map.removeLayer(this.topMap)
    this.map.removeLayer(this.vectorTileMapTilerHillShades)
    this.map.removeLayer(this.vectorTileArcGISpbf)
    this.map.removeLayer(this.manzanasVectorTileLayer)
    apply(
      this.map,
      //'../../assets/vectorTileStyles/Streets_try1.json'
      'https://api.maptiler.com/maps/b3265770-0173-4415-909d-264ef9934779/style.json?key=TihHLtBNpTt2U1j9teAe'
    )
    //olms.apply(this.map.addLayer(), styleJson);

  }

  changeToPortalesGeoserverWMS() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWFS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.portalesGeoserverWMS);
  }

  changeToPortalesGeoserverWFS() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.manzanasVectorTileLayer);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.portalesGeoserverWFS);
  }

  changeToManzanasGeoserverVectorTile() {
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.portalesGeoserverWMS);
    this.map.removeLayer(this.portalesGeoserverWFS);
    //para eliminar la ol-mapbox-style vector tile layer:
    this.map.getLayers().getArray().filter(
      layer => {
        return layer.get('mapbox-source')
      }
    ).forEach( layer => {
      this.map.removeLayer(layer)
    })
    this.map.addLayer(this.manzanasVectorTileLayer);


    this.manzanasVectorTileSource.on('tileloadend', function(evt) {
      let tilemia = evt.tile;
      console.log(tilemia);
    });

    //45001 features segun qgis count aggregate functions y 371 segun count_distinct( "INE_MUN" )



    let manzanasStyleFunction = function (feature, resolution) {
      let id = feature.getProperties().INE_MUN;
      let textStyle = new Text({
        font: '12px Calibri,sans-serif',
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
      if (id >= 9001 && id < 9500 ) {
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




  

}
