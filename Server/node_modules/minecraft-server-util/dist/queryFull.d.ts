import { QueryOptions } from './types/QueryOptions';
export interface FullQueryResponse {
    motd: {
        raw: string;
        clean: string;
        html: string;
    };
    version: string;
    software: string;
    plugins: string[];
    map: string;
    players: {
        online: number;
        max: number;
        list: string[];
    };
    hostIP: string;
    hostPort: number;
}
export declare function queryFull(host: string, port?: number, options?: QueryOptions): Promise<FullQueryResponse>;
