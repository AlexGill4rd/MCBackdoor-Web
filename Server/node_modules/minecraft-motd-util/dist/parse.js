"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var colorLookupNames = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
    'g': 'minecoin_gold'
};
var formattingLookupProperties = {
    'k': 'obfuscated',
    'l': 'bold',
    'm': 'strikethrough',
    'n': 'underline',
    'o': 'italics'
};
var parseBool = function (value) { return typeof value === 'boolean' ? value : typeof value === 'string' ? value.toLowerCase() === 'true' : false; };
var parseText = function (text, options) {
    var _a;
    var result = [{ text: '', color: 'white' }];
    var position = 0;
    while (position + 1 <= text.length) {
        var character = text.charAt(position);
        var item = result[result.length - 1];
        if (character === '\n') {
            result.push({ text: '\n', color: 'white' });
            position++;
            continue;
        }
        if (character !== options.formattingCharacter) {
            item.text += character;
            position++;
            continue;
        }
        var formattingCode = text.charAt(position + 1).toLowerCase();
        position += 2;
        if (formattingCode === 'r') {
            result.push({ text: '', color: 'white' });
            continue;
        }
        if (formattingCode in formattingLookupProperties) {
            if (item.text.length > 0) {
                result.push(__assign(__assign({}, item), (_a = { text: '' }, _a[formattingLookupProperties[formattingCode]] = true, _a)));
            }
            else {
                item[formattingLookupProperties[formattingCode]] = true;
            }
        }
        else if (formattingCode in colorLookupNames) {
            result.push({ text: '', color: colorLookupNames[formattingCode] });
        }
    }
    return result;
};
var parseChat = function (chat, options, parent) {
    var _a, _b;
    var result = parseText(chat.text || chat.translate || '', options);
    var item = result[0];
    if (((parent && parseBool(parent.bold)) && !parseBool(chat.bold)) || parseBool(chat.bold)) {
        item.bold = true;
    }
    if (((parent && parseBool(parent.italic)) && !parseBool(chat.italic)) || parseBool(chat.italic)) {
        item.italics = true;
    }
    if (((parent && parseBool(parent.underlined)) && !parseBool(chat.underlined)) || parseBool(chat.underlined)) {
        item.underline = true;
    }
    if (((parent && parseBool(parent.strikethrough)) && !parseBool(chat.strikethrough)) || parseBool(chat.strikethrough)) {
        item.strikethrough = true;
    }
    if (((parent && parseBool(parent.obfuscated)) && !parseBool(chat.obfuscated)) || parseBool(chat.obfuscated)) {
        item.obfuscated = true;
    }
    if (chat.color) {
        item.color = colorLookupNames[(_b = (_a = chat.color) !== null && _a !== void 0 ? _a : parent === null || parent === void 0 ? void 0 : parent.color) !== null && _b !== void 0 ? _b : 'white'] || chat.color;
    }
    if (chat.extra) {
        for (var _i = 0, _c = chat.extra; _i < _c.length; _i++) {
            var extra = _c[_i];
            result.push.apply(result, parseChat(extra, options, chat));
        }
    }
    return result;
};
exports.parse = function (input, options) {
    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);
    var result;
    switch (typeof input) {
        case 'string': {
            result = parseText(input, options);
            break;
        }
        case 'object': {
            result = parseChat(input, options);
            break;
        }
        default: {
            throw new Error('Unexpected server MOTD type: ' + typeof input);
        }
    }
    return result.filter(function (item) { return item.text.length > 0; });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLGdCQUFnQixHQUEyQjtJQUM3QyxHQUFHLEVBQUUsT0FBTztJQUNaLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxZQUFZO0lBQ2pCLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxVQUFVO0lBQ2YsR0FBRyxFQUFFLGFBQWE7SUFDbEIsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE9BQU87SUFDWixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLGNBQWM7SUFDbkIsR0FBRyxFQUFFLFFBQVE7SUFDYixHQUFHLEVBQUUsT0FBTztJQUNaLEdBQUcsRUFBRSxlQUFlO0NBQ3ZCLENBQUM7QUFFRixJQUFNLDBCQUEwQixHQUF5QztJQUNyRSxHQUFHLEVBQUUsWUFBWTtJQUNqQixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxlQUFlO0lBQ3BCLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxTQUFTO0NBQ2pCLENBQUM7QUFFRixJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQXdCLElBQWMsT0FBQSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQXZHLENBQXVHLENBQUM7QUFFakssSUFBTSxTQUFTLEdBQUcsVUFBQyxJQUFZLEVBQUUsT0FBcUI7O0lBQ2xELElBQU0sTUFBTSxHQUFnQixDQUFD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