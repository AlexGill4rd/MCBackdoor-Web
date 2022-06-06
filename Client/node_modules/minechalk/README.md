# minechalk

Convert your Minecraft color formatting to print in your console.

Supported with colors and formatting codes, except for obfuscation.

### Example Usage:

```js
const mc = require('minechalk');
const log = console.log;

log(mc("§3Provide a string here!"));
log(mc("&cYou can also use other symbols", "&"));
```