/// <reference types="node" />
export declare function readVarInt(readByte: () => Promise<number>): Promise<number>;
export declare function writeVarInt(value: number): Buffer;
