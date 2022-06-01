import assert from 'assert';
import { ParseOptions, ParseResult, ParseItem, FormattingProperties, Chat } from './types';

const colorLookupNames: Record<string, string> = {
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

const formattingLookupProperties: Record<string, FormattingProperties> = {
    'k': 'obfuscated',
    'l': 'bold',
    'm': 'strikethrough',
    'n': 'underline',
    'o': 'italics'
};

const parseBool = (value?: string | boolean): boolean => typeof value === 'boolean' ? value : typeof value === 'string' ? value.toLowerCase() === 'true' : false;

const parseText = (text: string, options: ParseOptions): ParseResult => {
    const result: ParseItem[] = [{ text: '', color: 'white' }];

    let position = 0;

    while (position + 1 <= text.length) {
        const character = text.charAt(position);

        let item: ParseItem = result[result.length - 1];

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

        const formattingCode = text.charAt(position + 1).toLowerCase();

        position += 2;

        if (formattingCode === 'r') {
            result.push({ text: '', color: 'white' });

            continue;
        }

        if (formattingCode in formattingLookupProperties) {
            if (item.text.length > 0) {
                result.push({ ...item, text: '', [formattingLookupProperties[formattingCode]]: true })
            } else {
                item[formattingLookupProperties[formattingCode]] = true;
            }
        } else if (formattingCode in colorLookupNames) {
            result.push({ text: '', color: colorLookupNames[formattingCode] });
        }
    }

    return result;
};

const parseChat = (chat: Chat, options: ParseOptions, parent?: Chat): ParseResult => {
    const result: ParseResult = parseText(chat.text || chat.translate || '', options);

    const item: ParseItem = result[0];

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
        item.color = colorLookupNames[chat.color ?? parent?.color ?? 'white'] || chat.color;
    }

    if (chat.extra) {
        for (const extra of chat.extra) {
            result.push(...parseChat(extra, options, chat));
        }
    }

    return result;
};

export const parse = (input: Chat | string, options?: ParseOptions): ParseResult => {
    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    let result;

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

    return result.filter((item) => item.text.length > 0);
};