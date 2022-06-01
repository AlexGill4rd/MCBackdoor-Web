import { QueryOptions } from './types/QueryOptions';
export interface BasicQueryResponse {
    motd: {
        raw: string;
        clean: string;
        html: string;
    };
    gameType: string;
    map: string;
    players: {
        online: number;
        max: number;
    };
    hostPort: number;
    hostIP: string;
}
export declare function queryBasic(host: string, port?: number, options?: QueryOptions): Promise<BasicQueryResponse>;
