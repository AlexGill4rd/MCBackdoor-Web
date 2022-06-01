"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = void 0;
var assert_1 = __importDefault(require("assert"));
exports.clean = function (text, options) {
    assert_1.default(typeof text === 'string' || Array.isArray(text), "Expected 'text' to be typeof 'string' or 'array', received '" + typeof text + "'");
    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);
    if (typeof text === 'string') {
        return text.replace(new RegExp(options.formattingCharacter + "[0-9a-gk-or]", 'g'), '');
    }
    return text.map(function (item) { return item.text; }).join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTRCO0FBR2YsUUFBQSxLQUFLLEdBQUcsVUFBQyxJQUEwQixFQUFFLE9BQXNCO0lBQ3BFLGdCQUFNLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsaUVBQStELE9BQU8sSUFBSSxNQUFHLENBQUMsQ0FBQztJQUV2SSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNwQixtQkFBbUIsRUFBRSxRQUFRO0tBQ2hDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFWixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUksT0FBTyxDQUFDLG1CQUFtQixpQkFBYyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFGO0lBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFBIn0=