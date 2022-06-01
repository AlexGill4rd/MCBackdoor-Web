export interface CompiledColor {
    name: string,
    hex: string,
    sum: number
}

class ColorUtil {
    private list: CompiledColor[] = [];

    constructor(list: Record<string, string>) {
        for (const key in list) {
            this.list.push({
                name: key,
                hex: list[key],
                sum: sum(list[key])
            });
        }
    }

    closest(input: string): CompiledColor | null {
        const colorSum = sum(input);
        let closest: CompiledColor | null = null;
        let lastDifference = Infinity;

        for (const color of this.list) {
            const diff = Math.abs(colorSum - color.sum);

            if (closest === null || diff < lastDifference) {
                closest = color;

                lastDifference = diff;
            }
        }

        return closest;
    }
}

const sum = (input: string): number => {
    let sum = 0;

    input = input.replace('#', '');

    const r = input.substring(0, 2);
    const g = input.substring(2, 4);
    const b = input.substring(4, 6);

    sum = Math.sqrt(parseInt(r, 16) ** 2 + parseInt(g, 16) ** 2 + parseInt(b, 16) ** 2);

    return sum;
};

export default ColorUtil;