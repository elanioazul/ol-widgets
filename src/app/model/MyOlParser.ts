import OpenLayersParser from "geostyler-openlayers-parser";

import Text from 'ol/style/Text';


var OlStyleUtil_1 = require("./Util/OlStyleUtil");


/*
chequear cuales de las vendor options implementadas por @bayer/geostyler-geoserver-sld-parser
estan implementadas por OpenLayerParser y cuales no.
const VENDOR_OPTIONS_MAP = [
  'partials', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'repeat',  -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'autoWrap',  -----------------------------------------------ver más abajo
  'maxDisplacements',  -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'group', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'spaceAround', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'conflictResolution', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'goodnessOfFit', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'labelAllGroup',-----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'polygonAlign' -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
]
*/


//NOTAS:

    //"@bayer/geostyler-geoserver-sld-parser" hace que el geoStylerStyle object acepte en rules de tipo TextSymbolizer, todas las vendorOptions que puedan venir en una TextSymbolizer de cualquier SLD, point, lines or polygon

    //querría implementar el "autoWrap" vendorOption por ejemplo
        //descubierto que al menos en Geoserver, el "followLine" vendorOption inactiva el "autoWrap"
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto.
        //ojo, tal vez el the label is wrapped by inserting the character \n, como en https://openlayers.org/en/latest/examples/vector-labels.html.

    //el followline vendorOption tbn molaría implementarlo PARA LABELS DE GEOMETRIA LINEA
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto
        //ojo, tal vez la "placement" 'line
        //tengo que existir el tag de LinePlacement dentro de LabelPlacement, y luego el vendorOption de turno.
      
    //textAlign y el textBaseline, tal y como como está comentado en el codigo original??????????????????


//hay que modificar el getOlTextSymbolizerFromTextSymbolizer
export class MyOlParser extends OpenLayersParser {
    getOlTextSymbolizerFromTextSymbolizer(symbolizer): any {
        debugger
        var _this = this;
        var baseProps = {
            font: OlStyleUtil_1.default.getTextFont(symbolizer),
            fill: new this.OlStyleFillConstructor({
                color: (symbolizer.color && symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
                    OlStyleUtil_1.default.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
            }),
            stroke: new this.OlStyleStrokeConstructor({
                color: (symbolizer.haloColor && symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
                    OlStyleUtil_1.default.getRgbaColor(symbolizer.haloColor, symbolizer.opacity) : symbolizer.haloColor,
                width: symbolizer.haloWidth ? symbolizer.haloWidth : 0
            }),
            offsetX: symbolizer.offset ? symbolizer.offset[0] : 0,
            offsetY: symbolizer.offset ? symbolizer.offset[1] : 0,
            rotation: symbolizer.rotate ? symbolizer.rotate * Math.PI / 180 : undefined
            // TODO check why props match
            // textAlign: symbolizer.pitchAlignment,
            // textBaseline: symbolizer.anchor
        };
        if (symbolizer.followLine && symbolizer.LabelPlacement[0].LinePlacement) {
            baseProps["placement"] = 'line';
        }
        // check if TextSymbolizer.label contains a placeholder
        var prefix = '\\{\\{';
        var suffix = '\\}\\}';
        var regExp = new RegExp(prefix + '.*?' + suffix, 'g');
        var regExpRes = symbolizer.label ? symbolizer.label.match(regExp) : null;
        if (regExpRes) {
            // if it contains a placeholder
            // return olStyleFunction
            var olPointStyledLabelFn = function (feature, res) {
                var text = new _this.OlStyleTextConstructor(Object.assign({ text: OlStyleUtil_1.default.resolveAttributeTemplate(feature, symbolizer.label, '') }, baseProps));
                var style = new _this.OlStyleConstructor({
                    text: text
                });
                return style;
            };
            return olPointStyledLabelFn;
        }
        else {
            // if TextSymbolizer does not contain a placeholder
            // return OlStyle
            return new this.OlStyleConstructor({
                text: new this.OlStyleTextConstructor(Object.assign({ text: symbolizer.label }, baseProps))
            });
        }

    }
}