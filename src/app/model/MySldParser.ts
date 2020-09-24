import SLDParser from "geostyler-sld-parser";
import GeoserverSldStyleParser from "@bayer/geostyler-geoserver-sld-parser";
import GeoserverTextSymbolizer from '../../../node_modules/@bayer/geostyler-geoserver-sld-parser/src/GeoserverTextSymbolizer';
import { IconSymbolizer } from 'geostyler-style';

const _get = require('lodash/get');


export class MySldParser extends GeoserverSldStyleParser {

    getIconSymbolizerFromSldSymbolizer(sldSymbolizer): any {
        const externalGraphic = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0]');
        const onlineResource = externalGraphic.OnlineResource ? externalGraphic.OnlineResource[0] : null;
        var iconSymbolizer: IconSymbolizer;
        if (onlineResource) {
            iconSymbolizer = <IconSymbolizer>{
                kind: 'Icon',
                image: onlineResource.$['xlink:href']
            };
        } else if (externalGraphic.InlineContent) {
            let inlineContent = externalGraphic.InlineContent[0]._.trim();
            iconSymbolizer = <IconSymbolizer>{
                kind: 'Icon',
                image: inlineContent
            };
        }

        var opacity = _get(sldSymbolizer, 'Graphic[0].Opacity[0]');
        var size = _get(sldSymbolizer, 'Graphic[0].Size[0]');
        var rotate = _get(sldSymbolizer, 'Graphic[0].Rotation[0]');
        if (opacity) {
            iconSymbolizer.opacity = opacity;
        }
        if (size) {
            iconSymbolizer.size = parseFloat(size);
        }
        if (rotate) {
            iconSymbolizer.rotate = parseFloat(rotate);
        }
        return iconSymbolizer;
    };

    getTextSymbolizerFromSldSymbolizer(sldSymbolizer) : any{
        debugger
        // var textSymbolizer = {
        //     kind: 'Text'
        // };
        const myfinalSymbolizer = super.getTextSymbolizerFromSldSymbolizer(sldSymbolizer)

        //to parse AnchorPointX and AnchorPointY to be translated into textAlign and textBaseline in OL
        var anchorpoint = _get(sldSymbolizer, 'LabelPlacement[0].PointPlacement[0].AnchorPoint[0]')
        debugger
        if (anchorpoint) {
            myfinalSymbolizer["anchor"] = 'center';
            var x = parseInt(anchorpoint.AnchorPointX[0]);
            var y = parseInt(anchorpoint.AnchorPointY[0]);
            if (x === 1 && y ===1) {
                myfinalSymbolizer["anchor"] = 'bottom-left'
            }
            if (x===0 && y===0) {
                myfinalSymbolizer["anchor"] = 'top-right'
            }
            if (x===0.5 && y===0) {
                myfinalSymbolizer["anchor"] = 'top'
            }
            if (x===0 && y===0.5) {
                myfinalSymbolizer["anchor"] = 'right'
            }
            if (x===0.5 && y===1) {
                myfinalSymbolizer["anchor"] = 'bottom'
            }
            if (x===1 && y===0.5) {
                myfinalSymbolizer["anchor"] = 'left'
            }
            if (x===1 && y===0) {
                myfinalSymbolizer["anchor"] = 'top-left'
            }
            if (x===0 && y===1) {
                myfinalSymbolizer["anchor"] = 'bottom-right'
            }
            if (x===0.5 && y===0.5) {
                myfinalSymbolizer["anchor"] = 'center'
            }
            
        }
        return myfinalSymbolizer;
    }

}


