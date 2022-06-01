import assert from 'assert';
import { ParseResult, HTMLOptions, SerializerElementOption } from './types';

const defaultSerializers: Record<string, SerializerElementOption> = {
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

export const toHTML = (tree: ParseResult, options?: HTMLOptions): string => {
    assert(Array.isArray(tree), `Expected 'tree' to be typeof 'array', received '${typeof tree}'`);

    const opts = Object.assign({
        serializers: defaultSerializers,
        rootTag: 'span'
    }, options);

    let result = `<${opts.rootTag}>`;

    for (const item of tree) {
        const classes = [];
        const styles: Record<string, string[]> = {};

        for (const prop in item) {
            if (prop === 'text') continue;

            const serializer = opts.serializers[prop === 'color' ? item[prop] : prop];

            if (serializer) {
                if (serializer.classes && serializer.classes.length > 0) {
                    classes.push(...serializer.classes);
                }

                if (serializer.styles) {
                    for (const attr in serializer.styles) {
                        if (!(attr in styles)) {
                            styles[attr] = [];
                        }

                        styles[attr].push(serializer.styles[attr]);
                    }
                }
            } else if (prop === 'color') {
                if (!('color' in styles)) {
                    styles.color = [];
                }

                styles.color.push(item[prop]);
            }
        }

        const content = item.text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        result += `<span${classes.length > 0 ? ` class="${classes.join(' ')}"` : ''}${Object.keys(styles).length > 0 ? ` style="${Object.entries(styles).map((style) => `${style[0]}: ${style[1].join(' ')};`).join(' ')}"` : ''}>${content}</span>`;
    }

    result += `</${opts.rootTag}>`;

    return result;
}