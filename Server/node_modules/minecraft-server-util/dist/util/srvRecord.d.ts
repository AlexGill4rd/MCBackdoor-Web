import { SRVRecord } from '../types/SRVRecord';
export declare function resolveSRV(host: string, protocol?: string): Promise<SRVRecord | null>;
