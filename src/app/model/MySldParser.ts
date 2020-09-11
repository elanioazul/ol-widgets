import SLDParser from "geostyler-sld-parser";
import { IconSymbolizer } from 'geostyler-style';
const _get = require('lodash/get');
import {
    parseString,
    Builder,
    OptionsV2
} from 'xml2js';

export class MySldParser extends SLDParser {

    getIconSymbolizerFromSldSymbolizer(sldSymbolizer): any {
        /*       debugger
               let onlineResource = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].OnlineResource[0]');
               //let inlineContent = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].InlineContent[0].childNodes[0].nodeValue');
               let inlineContent = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].InlineContent[0]');
               let imageToLoad = function() {
                   if (onlineResource = undefined) {
                       //let block = inlineContent._.replace(/(\r\n|\n|\r)/gm, '');
                       let block = inlineContent.replace(/↵/ig, '');
                       //let block = inlineContent.$.nodeValue;
                       let format = block[0].split(":")[1];
                       let imagedata = block[1].split(",")[1];
                       return [format, imagedata]
                       //return imagedata
                   } else {
                       let onlineResourceURI = onlineResource.$['xlink:href']
                       return onlineResourceURI
                   }
               }
               const iconSymbolizer: IconSymbolizer = <IconSymbolizer> {
                   kind: 'Icon',
                   image: imageToLoad()
               };
       */
        const externalGraphic = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0]');
        const onlineResource = externalGraphic.OnlineResource ? externalGraphic.OnlineResource[0] : null;// _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].OnlineResource[0]');
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

}