# minecraft-motd-util
Parse and convert a Minecraft MOTD into various formats.

## Installation

```bash
npm install minecraft-motd-util
```

## Usage

### Parsing
`parse(input, options)` will parse an MOTD into an array of tokens for easier formatting and generic use. The result of this method can be used as an argument to any other utility that uses an MOTD input. You can supply either a string or a [Chat](https://wiki.vg/Chat) object as the input.

```js
import { parse } from 'minecraft-motd-util';

// Defaults
const options = {
    formattingCharacter: '§'
};

const result = parse('§k;;; §cA §a§lMinecraft §cServer §r§k;;;', options); // `options` is optional

console.log(result);
// => [
//        { text: ';;; ', color: 'white', obfuscated: true },
//        { text: 'A ', color: 'red' },
//        { text: 'Minecraft ', color: 'green', bold: true },
//        { text: 'Server ', color: 'red' },
//        { text: ';;;', color: 'white', obfuscated: true }
//    ]
```

### Formatting
`format(input, options)` will format the parsed tree or string back into a normalized string with the provided formatting character. Note that this method will prefer resetting color over using `§r`.

```js
import { format } from 'minecraft-motd-util';

// Defaults
const options = {
    formattingCharacter: '§'
};

const result = format(result, options); // `options` is optional, `result` assumed from example above

console.log(result);
// => '§f§k;;; §cA §a§lMinecraft §cServer §f§k;;;'
```

### Clean
`clean(tree, options)` will remove all formatting codes and characters from the string with the implied formatting character.

```js
import { clean } from 'minecraft-motd-util';

// Defaults
const options = {
    formattingCharacter: '§'
};

const result = clean(result, options); // `options` is optional, `result` assumed from example above

console.log(result);
// => ';;; A Minecraft Server ;;;'
```

### Convert to HTML
`toHTML(input, options)` will convert the formatted string or parsed MOTD into an HTML string.

```js
import { toHTML } from 'minecraft-motd-util';

// Defaults
const options = {
    serializers: { ... }, // see `types.ts` for documentation
    rootTag: 'span'
};

const result = toHTML(result, options); // `options` is optional, `result` assumed from example above

console.log(result);
// => '<span><span class="minecraft-formatting-obfuscated" style="color: #FFFFFF;">;;; </span><span style="color: #FF5555;">A </span><span style="color: #55FF55; font-weight: bold;">Minecraft </span><span style="color: #FF5555;">Server </span><span class="minecraft-formatting-obfuscated" style="color: #FFFFFF;">;;;</span></span>'
```

## Support

If you require assistance with this library, you can ask within our official [Discord server](https://discord.gg/e7jgDYY).