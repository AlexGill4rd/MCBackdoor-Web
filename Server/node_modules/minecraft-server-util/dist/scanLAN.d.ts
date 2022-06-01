export interface ScanLANOptions {
    scanTime?: number;
}
export interface ScannedServer {
    host: string;
    port: number;
    motd: string;
}
export declare function scanLAN(options?: ScanLANOptions): Promise<ScannedServer[]>;
