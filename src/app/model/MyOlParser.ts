import OpenLayersParser from "geostyler-openlayers-parser";



var OlStyleUtil_1 = require("../../../node_modules/geostyler-openlayers-parser/build/dist/Util/OlStyleUtil");


/*
chequear cuales de las vendor options implementadas por @bayer/geostyler-geoserver-sld-parser
estan implementadas por OpenLayerParser y cuales no. 
Debido a este desarrollo, las vendorOptions se almacenan ahora en "LabelPlacement" en el simbolizer de geoStyler style en cuestión
pero no tienen su traducción a ningún otro estilo parece.
const VENDOR_OPTIONS_MAP = [
  'partials', -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'repeat',  -----------------------------------------------no veo la propiedad del la clase new Text de OL puede dar pie a modificar esto
  'autoWrap',  -----------------------------------------------tal vez con truncstring, como en https://openlayers.org/en/latest/examples/vector-labels.html
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

    //"@bayer/geostyler-geoserver-sld-parser" hace que el geoStylerStyle object acepte en rules de tipo TextSymbolizer,
    //todas las vendorOptions que puedan venir en una TextSymbolizer de cualquier SLD, point, lines or polygon

    //querría implementar el "autoWrap" vendorOption por ejemplo
        //descubierto que al menos en Geoserver, el "followLine" vendorOption inactiva el "autoWrap"
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto.
        //ojo, tal vez el the label is wrapped by inserting the character \n, como en https://openlayers.org/en/latest/examples/vector-labels.html.

    //el followline vendorOption tbn molaría implementarlo PARA LABELS DE GEOMETRIA LINEA
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto
        //ojo, tal vez la "placement" 'lines
        //tengo que existir el tag de LinePlacement dentro de LabelPlacement, y luego el vendorOption de turno.
            //done by hugo for OL!!!
      
    //textAlign y el textBaseline: https://openlayers.org/en/latest/examples/vector-labels.html
        //they have to be related to sld <AnchorPoint> element, specifing the placement of the label relative to the geometry being labelled.
            //OL/Text/ textAlign must has the following options: 'left', 'right', 'center', 'end' or 'start', which are only talking about horizontally placement.
            //OL/Text/ textBaseline must has the following options: 'bottom', 'top', 'middle', 'alphabetic', 'hanging', 'ideographic'.
        //consigo ver que el array de estilos que llega a la VectorTileLayer de OL tiene todas las propiedades que le he metido, pero no se randeriza de acuerdo a ello.
        //no se si se puede hacer más en realidad...

    //falta solventar el error about why rule of TextSymbolizer y rule of PointSymbolizor no ocurren a la vez, que puede quedar resuleto al lograr actuar sobre el textAlign y textBaseline de OL



export class MyOlParser extends OpenLayersParser {
    private _mapa: any;
    constructor(map: any) {
        super();
        this._mapa = map;
    }

    getOlTextSymbolizerFromTextSymbolizer(symbolizer): any {
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
        //vendorOption = 'followline'. Line, instead of the 'point' default value for the "placement" property of the New Text class of OL
        if (symbolizer.followLine && symbolizer.LabelPlacement[0].LinePlacement) {
            baseProps["placement"] = 'line';
        }
        //anchorPoint as anchor in symbolizer & baseLine and textAlign Ol
        if (symbolizer.LabelPlacement[0].PointPlacement && symbolizer.LabelPlacement[0].PointPlacement[0].AnchorPoint) {
            var axisX = parseInt(symbolizer.LabelPlacement[0].PointPlacement[0].AnchorPoint[0].AnchorPointX[0]);
            var axisY = parseInt(symbolizer.LabelPlacement[0].PointPlacement[0].AnchorPoint[0].AnchorPointY[0]);
            if (axisX === 1 && axisY ===1) {
                baseProps["textAlign"] = 'start';
                baseProps["textBaseline"] = 'top';
            }
            if (axisX===0 && axisY===0) {
                baseProps["textAlign"] = 'end';
                baseProps["textBaseline"] = 'bottom';
            }
            if (axisX===0.5 && axisY===0) {
                baseProps["textAlign"] = 'center';
                baseProps["textBaseline"] = 'bottom';
            }
            if (axisX===0 && axisY===0.5) {
                baseProps["textAlign"] = 'end';
                baseProps["textBaseline"] = 'middle';
            }
            if (axisX===0.5 && axisY===1) {
                baseProps["textAlign"] = 'center';
                baseProps["textBaseline"] = 'top';
            }
            if (axisX===1 && axisY===0.5) {
                baseProps["textAlign"] = 'start';
                baseProps["textBaseline"] = 'middle';
            }
            if (axisX===1 && axisY===0) {
                baseProps["textAlign"] = 'start';
                baseProps["textBaseline"] = 'bottom';
            }
            if (axisX===0 && axisY===1) {
                baseProps["textAlign"] = 'end';
                baseProps["textBaseline"] = 'top';
            }
            if (axisX===0.5 && axisY===0.5) {
                baseProps["textAlign"] = 'center';
                baseProps["textBaseline"] = 'middle';
            }

        }
        //vendorOption = 'autoWrap". 
        var labelTextToBeWrapped = symbolizer.label;
        if (symbolizer.autoWrap && !symbolizer.LabelPlacement[0].PointPlacement) {
            var getText = function () {
                if (this._mapa.getView().getResolution() > this._mapa.getView().getMaxResolution()) {
                    labelTextToBeWrapped = '';

                } else {
                    let labelTextWrapped = stringDivider(labelTextToBeWrapped, symbolizer.autoWrap, '\n');
                    return labelTextWrapped
                }
            }
        }
        //width value at your whim or the autoWrap vendorOption value, like the case
        var stringDivider = function stringDivider(str, width, spaceReplacer) {
            if (str.length > width) {
              var p = width;
              while (p > 0 && str[p] != ' ' && str[p] != '-') {
                p--;
              }
              if (p > 0) {
                var left;
                if (str.substring(p, p + 1) == '-') {
                  left = str.substring(0, p + 1);
                } else {
                  left = str.substring(0, p);
                }
                var right = str.substring(p + 1);
                return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
              }
            }
            return str;
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
                var text = new _this.OlStyleTextConstructor(Object.assign({ text: OlStyleUtil_1.default.resolveAttributeTemplate(feature, getText(), '') }, baseProps));
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
                text: new this.OlStyleTextConstructor(Object.assign({ text: getText() }, baseProps))
            });
        }

    }
}