import OpenLayersParser from "geostyler-openlayers-parser";



var OlStyleUtil_1 = require("../../../node_modules/geostyler-openlayers-parser/build/dist/Util/OlStyleUtil");
//var OlStyleUtil_2 = require("./MyOlStyleUtil");
import { MyOlstyleUtil } from "./MyOlStyleUtil";


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
        //estoy viendo que la labelTextToBeWrapped que le paso a la función de recortar string en función del autoWrap vendorOption es {{TIPO}}, y no los distintos "TIPOS" de geomorfologias.
        //me estoy quedando en la capa externa de la cebolla, tengo que entrar al valor cogiendo feature.get('TIPO'). ¿pero cómo?
        //tal vez modificando la función OlStyleUtil.resolveAttributeTemplate. Dificil...
        //Pero veo que escupe "template" y es un string. Entonces es el feature.get y aqui tiene que verse afectado por la function getText, que querría devolver el valor del atributo con el salto de linea.
        //linea 185 seria OlStyleUtil_1.default como era originalmente pero ahora estoy llamando a mi extensión de clase, MyOlstyleUtil, y pasandole undefined a valueAdjust para que no pete diciendo que no es función si le pasaba como ''.
        //no termina de funcionar el stringDivider
    
    //el followline vendorOption tbn molaría implementarlo PARA LABELS DE GEOMETRIA LINEA
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto
        //ojo, tal vez la "placement" 'lines
        //tengo que existir el tag de LinePlacement dentro de LabelPlacement, y luego el vendorOption de turno.
                    //done by hugo!!!
    //molaria ahora implementar el PerpendicualrOffset, a través de llegarle a la clase New Text de OL con "textBaseline" y sus posibilidades
                    //done by hugo!!!
    //molaría implementar ahora el maxAngleDelta de OL, pues por default entra en el new Text Ol 45º pero se podría suavizar, pq las labes sobre las lineas a veces son muy afiladas, solapandose algun character

    //si no hay Displacement, el AnchorPoint no lo coje y se randeriza la label sobre simbologia. Si sí lo hay, genera un offset pero sin tener en cuenta la dirección de offset.
        //efectivamente, no hay textsymbolizer.anchor propery pero si hay textSymbolizer.offset que coge el Displacement
        //la estoy tratando de crear pero hay que ir al finalSymbolizer de @bayer/geostyler-geoserver-sld-parser plus añadir a la interface TextSymbolizer algo.
        //Sacado de Tinterface TextSymbolizer: anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        //estas son los 9 cuadrantes del qgis = las 9 combinaciones de AnchorPoit en SLD Labeling for Point.
    //se trata ahora de ajustar con :
        //textAlign y el textBaseline: https://openlayers.org/en/latest/examples/vector-labels.html
            //OL/Text/ textAlign must has the following options: 'left', 'right', 'center', 'end' or 'start',  horizontally placement.
            //OL/Text/ textBaseline must has the following options: 'bottom', 'top', 'middle', 'alphabetic', 'hanging', 'ideographic',  vertical placement.



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
        //PerpendicularOffset for the followLine (located in LabelPlacement\LinePlacement):
        if (symbolizer.LabelPlacement[0].LinePlacement && symbolizer.LabelPlacement[0].LinePlacement[0].PerpendicularOffset) {
            baseProps["offsetY"] = - symbolizer.LabelPlacement[0].LinePlacement[0].PerpendicularOffset[0];
        }
        //anchorPoint as anchor in symbolizer & baseLine and textAlign in Ol
        if (symbolizer.anchor) {
            var anch = symbolizer.anchor;
            switch (anch) {
                case 'bottom-left':
                    baseProps["textAlign"] = 'start';
                    baseProps["textBaseline"] = 'top';
                    break;
                case 'top-right':
                    baseProps["textAlign"] = 'end';
                    baseProps["textBaseline"] = 'bottom';
                    break;
                case 'top':
                    baseProps["textAlign"] = 'center';
                    baseProps["textBaseline"] = 'bottom';
                    break;
                case 'right':
                    baseProps["textAlign"] = 'end';
                    baseProps["textBaseline"] = 'middle';
                    break;
                case 'bottom':
                    baseProps["textAlign"] = 'center';
                    baseProps["textBaseline"] = 'top';
                    break;
                case 'left':
                    baseProps["textAlign"] = 'start';
                    baseProps["textBaseline"] = 'middle';
                    break;
                case 'top-left':
                    baseProps["textAlign"] = 'start';
                    baseProps["textBaseline"] = 'bottom';
                    break;
                case 'bottom-right':
                    baseProps["textAlign"] = 'end';
                    baseProps["textBaseline"] = 'top';
                    break;
                case 'center':
                    baseProps["textAlign"] = 'center';
                    baseProps["textBaseline"] = 'middle';
                    break;
                default:
                    console.log("no anchor position or no anchor positions matches") 
            }
        }
        //maxDelta
        if (symbolizer.maxAngleDelta) {
            baseProps["maxAngle"] = parseInt(symbolizer.maxAngleDelta)
        }
        // check if TextSymbolizer.label contains a placeholder
        var prefix = '\\{\\{';
        var suffix = '\\}\\}';
        var regExp = new RegExp(prefix + '.*?' + suffix, 'g');
        var regExpRes = symbolizer.label ? symbolizer.label.match(regExp) : null;
        if (regExpRes) {
            // if it contains a placeholder
            // return olStyleFunction
            var olPointStyledLabelFn = (feature, res) => {
                //var labelAttribute = feature.getProperties()[symbolizer.label];
                var myolstyleutil = new MyOlstyleUtil(this._mapa, symbolizer)
                var text = new _this.OlStyleTextConstructor(Object.assign({ text: myolstyleutil.myResolveAttributeTemplate(feature, symbolizer.label, '', undefined, symbolizer) }, baseProps));
                var style = new _this.OlStyleConstructor({
                    text: text
                });
                return style;
            };
            debugger
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