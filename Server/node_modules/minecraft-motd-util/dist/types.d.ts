export declare type FormattingProperties = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'obfuscated';
export interface ParseItem {
    color: string;
    bold?: boolean;
    italics?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    text: string;
}
export declare type ParseResult = ParseItem[];
export interface ParseOptions {
    formattingCharacter?: string;
}
export interface CleanOptions {
    formattingCharacter?: string;
}
export interface FormatOptions {
    formattingCharacter?: string;
    replaceNearestColor?: boolean;
}
export interface SerializerElementOption {
    classes?: string[];
    styles?: Record<string, string>;
}
export interface HTMLOptions {
    serializers?: Record<string | FormattingProperties, SerializerElementOption>;
    rootTag?: string;
}
export interface Chat {
    text: string;
    translate?: string;
    color?: string;
    bold?: string;
    italic?: string;
    underlined?: string;
    strikethrough?: string;
    obfuscated?: string;
    extra?: Chat[];
}
