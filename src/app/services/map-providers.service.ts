import { Injectable, inject, Inject } from '@angular/core';

import Map  from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';
import TileJSON from 'ol/source/TileJSON';
import ImageTile from 'ol/ImageTile';
import { apply } from 'ol/transform';

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

  public vectorTileMapTilerSatMediumbres = new TileLayer ({
    source: new TileJSON ({
      url: 'https://api.maptiler.com/tiles/satellite-mediumres-2018/tiles.json?key=TihHLtBNpTt2U1j9teAe',
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

  public vectorTileMapTiler = new VectorTileLayer({
    source: new VectorTileSource({
      attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      url: 'https://api.maptiler.com/maps/b3265770-0173-4415-909d-264ef9934779/style.json?key=TihHLtBNpTt2U1j9teAe',

    })
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
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.stamenWaterColor);

    
  }
  changeToTerrain() {
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.stamenTerrain)
  }
  changeToOsm() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.osm);
  }

  changeToTopoMap() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.topMap);
  }

  changeToVectorTileHillShade() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.vectorTileMapTilerHillShades);
  }

  changeToVectorTileSat() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.vectorTileMapTilerSatMediumbres);
  }

  changeToVectorTileArcGIS() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileMapTiler);
    this.map.addLayer(this.vectorTileArcGISpbf);
  }

  changeToVectorTileMapTilerEmbebedJson() {
    this.map.removeLayer(this.stamenTerrain);
    this.map.removeLayer(this.stamenWaterColor);
    this.map.removeLayer(this.osm);
    this.map.removeLayer(this.topMap);
    this.map.removeLayer(this.vectorTileMapTilerHillShades);
    this.map.removeLayer(this.vectorTileMapTilerSatMediumbres);
    this.map.removeLayer(this.vectorTileArcGISpbf);
    //this.map.addLayer(this.vectorTileMapTiler);
    // apply(
    //   this.map,
    //   'https://api.maptiler.com/maps/b3265770-0173-4415-909d-264ef9934779/style.json?key=TihHLtBNpTt2U1j9teAe'
    // )

  }



  

}
