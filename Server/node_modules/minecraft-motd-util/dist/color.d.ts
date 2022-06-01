export interface CompiledColor {
    name: string;
    hex: string;
    sum: number;
}
declare class ColorUtil {
    private list;
    constructor(list: Record<string, string>);
    closest(input: string): CompiledColor | null;
}
export default ColorUtil;
