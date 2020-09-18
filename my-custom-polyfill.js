import {
    Filter,
    StyleParser,
    Style,
    Rule,
    FunctionFilter,
    ComparisonOperator,
    CombinationOperator,
    ScaleDenominator,
    PointSymbolizer,
    Symbolizer,
    IconSymbolizer,
    LineSymbolizer,
    FillSymbolizer,
    TextSymbolizer,
    RasterSymbolizer,
    ColorMap,
    ChannelSelection,
    ComparisonFilter,
    MarkSymbolizer,
    WellKnownName,
    ColorMapEntry,
    Channel,
    ContrastEnhancement,
    StrMatchesFunctionFilter
  } from 'geostyler-style';




 //he metido a pelo como atributo cabecera en el sld que quiero parsear el "standalone='no'",
 //para que un documento xml pueda tener más de una codificación (UTF-8 y base64)

// if(!SldStyleParser.prototype.getIconBase64SymbolizerFromSldSymbolizer) {
//    SldStyleParser.prototype.getIconBase64SymbolizerFromSldSymbolizer = function() {
//        const inlineContent = _get(sldSymbolizer, 'Graphic[0].ExternalGraphic[0].InlineContent[0]');
//        const stringFromBase64 = btoa(inlineContent.$['encoding']);
//        const stringFromBase64_2 = XMLDocument.getElementByTagName("inlineContent")[0].childNodes[0].nodeValue;
//        const iconSymbolizer: IconSymbolizer = <IconSymbolizer> {
//            kind: 'Icon',
//            image: stringFromBase64
//        };
//        const opacity = _get(sldSymbolizer, 'Graphic[0].Opacity[0]');
//        const size = _get(sldSymbolizer, 'Graphic[0].Size[0]');
//        const rotate = _get(sldSymbolizer, 'Graphic[0].Rotation[0]');
//        if (opacity) {
//          iconSymbolizer.opacity = opacity;
//        }
//        if (size) {
//          iconSymbolizer.size = parseFloat(size);
//        }
//        if (rotate) {
//          iconSymbolizer.rotate = parseFloat(rotate);
//        }
//        return iconSymbolizer
//    }

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) { 
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}