const Chalk = require("chalk");

const Formatting = {
    l: Chalk.bold,
    m: Chalk.strikethrough,
    n: Chalk.underline,
    o: Chalk.italic
};

const Colours = {
    0: Chalk.rgb(0, 0, 0),
    1: Chalk.rgb(0, 0, 170),
    2: Chalk.rgb(0, 170, 0),
    3: Chalk.rgb(0, 170, 170),
    4: Chalk.rgb(170, 0, 0),
    5: Chalk.rgb(170, 0, 170),
    6: Chalk.rgb(255, 270, 0),
    7: Chalk.rgb(170, 170, 170),
    8: Chalk.rgb(85, 85, 85),
    9: Chalk.rgb(85, 85, 255),
    a: Chalk.rgb(85, 255, 85),
    b: Chalk.rgb(85, 255, 255),
    c: Chalk.rgb(255, 85, 85),
    d: Chalk.rgb(255, 85, 255),
    e: Chalk.rgb(255, 255, 85),
    f: Chalk.rgb(255, 255, 255),
    g: Chalk.rgb(221, 214, 5)
};

const Resolve = (message, symbol) => {
    if (!symbol) symbol = '§';
    let Sections = message.split(symbol);
    for (let i = 1; i < Sections.length; i++) {
        const C = Sections[i].substr(0, 1);
        const PrC = (i > 1) ? Sections[i - 1].substr(-1) : null;
        if (Colours[C]) Sections[i] = Colours[C](Sections[i].substr(1)) + C;
        else if (Formatting[C]) {
            Sections[i] = `${Formatting[C](Sections[i].substr(1))}${C}`;
            if (i > 1 && Colours[PrC]) Sections[i] = `${Colours[PrC](Sections[i].substr(1))}${PrC}`;
        }
        else if (C === 'r') Sections[i] = `${Sections[i].substr(1)}${C}`;
        else if (i === 1) Sections[i] = `${symbol}${Sections[i]}r`;
        else if (i > 1) {
            Sections[i] = `${PrC}${symbol}${Sections[i].substr(1)}`;
            i--;
        }
    }
    for (let i = 1; i < Sections.length; i++) Sections[i] = Sections[i].slice(0, -1);
    return Sections.join('');
};

module.exports = Resolve;
