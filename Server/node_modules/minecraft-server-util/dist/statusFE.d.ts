import { JavaStatusOptions } from './types/JavaStatusOptions';
import { JavaStatusFEResponse } from './types/JavaStatusFEResponse';
/**
 * @deprecated
 */
export declare function statusFE(host: string, port?: number, options?: JavaStatusOptions): Promise<JavaStatusFEResponse>;
