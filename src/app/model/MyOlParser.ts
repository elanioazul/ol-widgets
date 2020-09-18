import OpenLayersParser from "geostyler-openlayers-parser";

import Text from 'ol/style/Text';

/*
chequear cuales de las vendor options implementadas por @bayer/geostyler-geoserver-sld-parser
estan implementadas por OpenLayerParser y cuales no.
const VENDOR_OPTIONS_MAP = [
  'partials',
  'repeat',
  'autoWrap',
  'maxDisplacements',
  'group',
  'spaceAround',
  'conflictResolution',
  'goodnessOfFit',
  'labelAllGroup',
  'polygonAlign'
]
*/


//NOTAS:

    //"@bayer/geostyler-geoserver-sld-parser" hace que el geoStylerStyle object acepte en ruleS de TextSymbolizer, todas las vendorOptions que puedan venir en una TextSymbolizer de cualquier SLD, point, lines or polygon

    //querría implementar el "autoWrap" vendorOption por ejemplo
        //descubierto que al menos en Geoserver, el "followLine" vendorOption inactiva el "autoWrap"
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto.
        //ojo, tal vez el the label is wrapped by inserting the character \n, como en https://openlayers.org/en/latest/examples/vector-labels.html.

    //el followline tbn molaría implementarlo
        //no veo qué propiedad del la clase new Text de OL puede dar pie a modificar esto
        //ojo, tal vez la "placement"
      
    //textAlign y el textBaseline, tal y como como está comentado en el codigo original??????????????????


//hay que modificar el getOlTextSymbolizerFromTextSymbolizer
 