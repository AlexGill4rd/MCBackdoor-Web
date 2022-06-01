"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
var assert_1 = __importDefault(require("assert"));
var parse_1 = require("./parse");
var color_1 = __importDefault(require("./color"));
var colorLookupCodes = {
    'black': '0',
    'dark_blue': '1',
    'dark_green': '2',
    'dark_aqua': '3',
    'dark_red': '4',
    'dark_purple': '5',
    'gold': '6',
    'gray': '7',
    'dark_gray': '8',
    'blue': '9',
    'green': 'a',
    'aqua': 'b',
    'red': 'c',
    'light_purple': 'd',
    'yellow': 'e',
    'white': 'f',
    'minecoin_gold': 'g'
};
var colorValues = {
    'black': '#000000',
    'dark_blue': '#0000AA',
    'dark_green': '#00AA00',
    'dark_aqua': '#00AAAA',
    'dark_red': '#AA0000',
    'dark_purple': '#AA00AA',
    'gold': '#FFAA00',
    'gray': '#AAAAAA',
    'dark_gray': '#555555',
    'blue': '#5555FF',
    'green': '#55FF55',
    'aqua': '#55FFFF',
    'red': '#FF5555',
    'light_purple': '#FF55FF',
    'yellow': '#FFFF55',
    'white': '#FFFFFF'
};
var colorUtil = new color_1.default(colorValues);
exports.format = function (input, options) {
    assert_1.default(typeof input === 'string' || Array.isArray(input), "Expected 'input' to be typeof 'array' or typeof 'string', got '" + typeof input + "'");
    if (typeof input === 'string') {
        input = parse_1.parse(input, options);
    }
    var opts = Object.assign({
        formattingCharacter: '\u00A7',
        replaceNearestColor: true
    }, options);
    var result = '';
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var item = input_1[_i];
        if (item.color) {
            var formatColor = colorLookupCodes[item.color];
            if (formatColor) {
                result += opts.formattingCharacter + colorLookupCodes[item.color];
            }
            else if (opts.replaceNearestColor) {
                var newColor = colorUtil.closest(item.color);
                if (newColor) {
                    var colorCode = colorLookupCodes[newColor.name];
                    if (colorCode) {
                        result += opts.formattingCharacter + colorCode;
                    }
                }
            }
        }
        if (item.bold) {
            result += opts.formattingCharacter + 'l';
        }
        if (item.italics) {
            result += opts.formattingCharacter + 'o';
        }
        if (item.underline) {
            result += opts.formattingCharacter + 'n';
        }
        if (item.strikethrough) {
            result += opts.formattingCharacter + 'm';
        }
        if (item.obfuscated) {
            result += opts.formattingCharacter + 'k';
        }
        result += item.text;
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFDNUIsaUNBQWdDO0FBRWhDLGtEQUFnQztBQUVoQyxJQUFNLGdCQUFnQixHQUEyQjtJQUM3QyxPQUFPLEVBQUUsR0FBRztJQUNaLFdBQVcsRUFBRSxHQUFHO0lBQ2hCLFlBQVksRUFBRSxHQUFHO0lBQ2pCLFdBQVcsRUFBRSxHQUFHO0lBQ2hCLFVBQVUsRUFBRSxHQUFHO0lBQ2YsYUFBYSxFQUFFLEdBQUc7SUFDbEIsTUFBTSxFQUFFLEdBQUc7SUFDWCxNQUFNLEVBQUUsR0FBRztJQUNYLFdBQVcsRUFBRSxHQUFHO0lBQ2hCLE1BQU0sRUFBRSxHQUFHO0lBQ1gsT0FBTyxFQUFFLEdBQUc7SUFDWixNQUFNLEVBQUUsR0FBRztJQUNYLEtBQUssRUFBRSxHQUFHO0lBQ1YsY0FBYyxFQUFFLEdBQUc7SUFDbkIsUUFBUSxFQUFFLEdBQUc7SUFDYixPQUFPLEVBQUUsR0FBRztJQUNaLGVBQWUsRUFBRSxHQUFHO0NBQ3ZCLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBMkI7SUFDeEMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsWUFBWSxFQUFFLFNBQVM7SUFDdkIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsVUFBVSxFQUFFLFNBQVM7SUFDckIsYUFBYSxFQUFFLFNBQVM7SUFDeEIsTUFBTSxFQUFFLFNBQVM7SUFDakIsTUFBTSxFQUFFLFNBQVM7SUFDakIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsTUFBTSxFQUFFLFNBQVM7SUFDakIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsT0FBTyxFQUFFLFNBQVM7Q0FDckIsQ0FBQztBQUVGLElBQU0sU0FBUyxHQUFHLElBQUksZUFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWhDLFFBQUEsTUFBTSxHQUFHLFVBQUMsS0FBMkIsRUFBRSxPQUF1QjtJQUN2RSxnQkFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLG9FQUFrRSxPQUFPLEtBQUssTUFBRyxDQUFDLENBQUM7SUFFN0ksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsS0FBSyxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLG1CQUFtQixFQUFFLFFBQVE7UUFDN0IsbUJBQW1CLEVBQUUsSUFBSTtLQUM1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWhCLEtBQW1CLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQUU7UUFBckIsSUFBTSxJQUFJLGNBQUE7UUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakQsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckU7aUJBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ2pDLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUvQyxJQUFJLFFBQVEsRUFBRTtvQkFDVixJQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRWxELElBQUksU0FBUyxFQUFFO3dCQUNYLE1BQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO3FCQUNsRDtpQkFDSjthQUNKO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxNQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztTQUM1QztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE1BQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDdkI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUEifQ==