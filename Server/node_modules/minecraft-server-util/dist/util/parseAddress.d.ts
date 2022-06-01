export interface ParsedAddress {
    host: string;
    port: number;
}
export declare function parseAddress(value: string, defaultPort?: number): ParsedAddress | null;
