import OlStyleUtil from '../../../node_modules/geostyler-openlayers-parser/build/dist/Util/OlStyleUtil';


export class MyOlstyleUtil extends OlStyleUtil {
    private _mapa: any;
    constructor(map: any, symbolizer: any) {
        super();
        this._mapa = map;
    }
    /**
     * Resolves the given template string with the given feature attributes, e.g.
     * the template "Size of area is {{AREA_SIZE}} km²" would be to resolved
     * to "Size of area is 1909 km²" (assuming the feature's attribute AREA_SIZE
     * really exists).
     *
     * @param {ol.Feature} feature The feature to get the attributes from.
     * @param {String} template The template string to resolve.
     * @param {String} [noValueFoundText] The text to apply, if the templated value
     *   could not be found, default is to 'n.v.'.
     * @param {Function} [valueAdjust] A method that will be called with each
     *   key/value match, we'll use what this function returns for the actual
     *   replacement. Optional, defaults to a function which will return the raw
     *   value it received. This can be used for last minute adjustments before
     *   replacing happens, e.g. to filter out falsy values or to do number
     *   formatting and such.
     * @param {Object} [symbolizer] A object containing properties to build up a proper text
     *   to be passed to new Text Ol.
     * @return {String} The resolved template string.
    */
   myResolveAttributeTemplate = function (feature, template, noValueFoundText, valueAdjust, symbolizer) {
        if (noValueFoundText === void 0) { noValueFoundText = 'n.v.'; }
        if (valueAdjust === void 0) { valueAdjust = function (key, val) { return val; }; }
        var attributeTemplatePrefix = '\\{\\{';
        var attributeTemplateSuffix = '\\}\\}';
        // Find any character between two braces (including the braces in the result)
        var regExp = new RegExp(attributeTemplatePrefix + '(.*?)' + attributeTemplateSuffix, 'g');
        var regExpRes = template.match(regExp);
        // If we have a regex result, it means we found a placeholder in the
        // template and have to replace the placeholder with its appropriate value.
        if (regExpRes) {
            // Iterate over all regex match results and find the proper attribute
            // for the given placeholder, finally set the desired value to the hover.
            // field text
            regExpRes.forEach(function (res) {
                // We count every non matching candidate. If this count is equal to
                // the objects length, we assume that there is no match at all and
                // set the output value to the value of "noValueFoundText".
                var noMatchCnt = 0;
                for (var _i = 0, _a = Object.entries(feature.getProperties()); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    // Remove the suffixes and find the matching attribute column.
                    var attributeName = res.slice(2, res.length - 2);
                    if (attributeName.toLowerCase() === key.toLowerCase()) {
                        template = template.replace(res, valueAdjust(key, value));
                        break;
                    }
                    else {
                        noMatchCnt++;
                    }
                }
                // No key match found for this feature (e.g. if key not
                // present or value is null).
                if (noMatchCnt === Object.keys(feature.getProperties()).length) {
                    template = template.replace(res, noValueFoundText);
                }
            });
        }
        //width value at your whim or the autoWrap vendorOption value, like the case
        var stringDivider = function (str, width, spaceReplacer) {
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
        //vendorOption = 'autoWrap".
        if (symbolizer.autoWrap) {
            var getText = () => {
                var currentResolution = this._mapa.getView().getResolution();
                var maxResolution = this._mapa.getView().getMaxResolution();
                if (currentResolution > maxResolution) {
                    template = '';
                } else {
                    template = stringDivider(template, parseInt(symbolizer.autoWrap), '\n');
                }
                return template
            }
  
        }
        debugger
        return template;
    };
};

