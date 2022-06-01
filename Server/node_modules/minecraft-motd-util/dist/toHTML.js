"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHTML = void 0;
var assert_1 = __importDefault(require("assert"));
var defaultSerializers = {
    'black': { styles: { color: '#000000' } },
    'dark_blue': { styles: { color: '#0000AA' } },
    'dark_green': { styles: { color: '#00AA00' } },
    'dark_aqua': { styles: { color: '#00AAAA' } },
    'dark_red': { styles: { color: '#AA0000' } },
    'dark_purple': { styles: { color: '#AA00AA' } },
    'gold': { styles: { color: '#FFAA00' } },
    'gray': { styles: { color: '#AAAAAA' } },
    'dark_gray': { styles: { color: '#555555' } },
    'blue': { styles: { color: '#5555FF' } },
    'green': { styles: { color: '#55FF55' } },
    'aqua': { styles: { color: '#55FFFF' } },
    'red': { styles: { color: '#FF5555' } },
    'light_purple': { styles: { color: '#FF55FF' } },
    'yellow': { styles: { color: '#FFFF55' } },
    'white': { styles: { color: '#FFFFFF' } },
    'minecoin_gold': { styles: { color: '#DDD605' } },
    'obfuscated': { classes: ['minecraft-formatting-obfuscated'] },
    'bold': { styles: { 'font-weight': 'bold' } },
    'strikethrough': { styles: { 'text-decoration': 'line-through' } },
    'underline': { styles: { 'text-decoration': 'underline' } },
    'italics': { styles: { 'font-style': 'italic' } }
};
exports.toHTML = function (tree, options) {
    assert_1.default(Array.isArray(tree), "Expected 'tree' to be typeof 'array', received '" + typeof tree + "'");
    var opts = Object.assign({
        serializers: defaultSerializers,
        rootTag: 'span'
    }, options);
    var result = "<" + opts.rootTag + ">";
    for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
        var item = tree_1[_i];
        var classes = [];
        var styles = {};
        for (var prop in item) {
            if (prop === 'text')
                continue;
            var serializer = opts.serializers[prop === 'color' ? item[prop] : prop];
            if (serializer) {
                if (serializer.classes && serializer.classes.length > 0) {
                    classes.push.apply(classes, serializer.classes);
                }
                if (serializer.styles) {
                    for (var attr in serializer.styles) {
                        if (!(attr in styles)) {
                            styles[attr] = [];
                        }
                        styles[attr].push(serializer.styles[attr]);
                    }
                }
            }
            else if (prop === 'color') {
                if (!('color' in styles)) {
                    styles.color = [];
                }
                styles.color.push(item[prop]);
            }
        }
        var content = item.text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        result += "<span" + (classes.length > 0 ? " class=\"" + classes.join(' ') + "\"" : '') + (Object.keys(styles).length > 0 ? " style=\"" + Object.entries(styles).map(function (style) { return style[0] + ": " + style[1].join(' ') + ";"; }).join(' ') + "\"" : '') + ">" + content + "</span>";
    }
    result += "</" + opts.rootTag + ">";
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IVE1MLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RvSFRNTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFHNUIsSUFBTSxrQkFBa0IsR0FBNEM7SUFDaEUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3pDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUM3QyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDOUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQzdDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUM1QyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDL0MsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUN4QyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUN6QyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDeEMsS0FBSyxFQUFFLEVBQUUsTUFB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