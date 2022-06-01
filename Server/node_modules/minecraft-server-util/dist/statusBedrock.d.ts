import { BedrockStatusOptions } from './types/BedrockStatusOptions';
import { BedrockStatusResponse } from './types/BedrockStatusResponse';
export declare function statusBedrock(host: string, port?: number, options?: BedrockStatusOptions): Promise<BedrockStatusResponse>;
