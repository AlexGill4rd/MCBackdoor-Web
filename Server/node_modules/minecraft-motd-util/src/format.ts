import assert from 'assert';
import { parse } from './parse';
import { FormatOptions, ParseResult } from './types';
import ColorUtil from './color';

const colorLookupCodes: Record<string, string> = {
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

const colorValues: Record<string, string> = {
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

const colorUtil = new ColorUtil(colorValues);

export const format = (input: string | ParseResult, options?: FormatOptions): string => {
    assert(typeof input === 'string' || Array.isArray(input), `Expected 'input' to be typeof 'array' or typeof 'string', got '${typeof input}'`);

    if (typeof input === 'string') {
        input = parse(input, options);
    }

    const opts = Object.assign({
        formattingCharacter: '\u00A7',
        replaceNearestColor: true
    }, options);

    let result = '';

    for (const item of input) {
        if (item.color) {
            const formatColor = colorLookupCodes[item.color];

            if (formatColor) {
                result += opts.formattingCharacter + colorLookupCodes[item.color];
            } else if (opts.replaceNearestColor) {
                const newColor = colorUtil.closest(item.color);

                if (newColor) {
                    const colorCode = colorLookupCodes[newColor.name];

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
}