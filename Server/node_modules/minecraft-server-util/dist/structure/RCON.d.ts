/// <reference types="node" />
import { EventEmitter } from 'events';
import { NetConnectOpts } from 'net';
export interface RCONLoginOptions {
    timeout?: number;
}
export interface Message {
    requestID: number;
    message: string;
}
export interface RCONEvents {
    on(event: 'message', listener: (data: Message) => void): void;
    once(event: 'message', listener: (data: Message) => void): void;
    emit(event: 'message', value: Message): void;
}
declare class RCON extends EventEmitter implements RCONEvents {
    isLoggedIn: boolean;
    private socket;
    private requestID;
    constructor();
    get isConnected(): boolean;
    connect(host: string, port?: number, options?: Partial<NetConnectOpts>): Promise<void>;
    login(password: string, options?: RCONLoginOptions): Promise<void>;
    run(command: string): Promise<number>;
    execute(command: string): Promise<string>;
    _readPacket(): Promise<void>;
    close(): void;
}
export { RCON };
