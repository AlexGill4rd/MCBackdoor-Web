import { JavaStatusOptions } from './types/JavaStatusOptions';
import { JavaStatusResponse } from './types/JavaStatusResponse';
export declare function status(host: string, port?: number, options?: JavaStatusOptions): Promise<JavaStatusResponse>;
