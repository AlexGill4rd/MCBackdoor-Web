import assert from 'assert';
import { CleanOptions, ParseResult } from './types';

export const clean = (text: ParseResult | string, options?: CleanOptions): string => {
    assert(typeof text === 'string' || Array.isArray(text), `Expected 'text' to be typeof 'string' or 'array', received '${typeof text}'`);

    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    if (typeof text === 'string') {
        return text.replace(new RegExp(`${options.formattingCharacter}[0-9a-gk-or]`, 'g'), '');
    }

    return text.map((item) => item.text).join('');
}