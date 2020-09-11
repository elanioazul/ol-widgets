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
        alert("HOLA");

        const inlineContent = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].InlineContent[0]');
        const stringFromBase64 = btoa(inlineContent.$['encoding']);
        //const stringFromBase64_2 = XMLDocument.getElementByTagName("inlineContent")[0].childNodes[0].nodeValue;
        const iconSymbolizer: IconSymbolizer = <IconSymbolizer> {
            kind: 'Icon',
            image: stringFromBase64
        };


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