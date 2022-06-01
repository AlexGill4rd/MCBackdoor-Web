import { JavaStatusOptions } from './types/JavaStatusOptions';
import { JavaStatusLegacyResponse } from './types/JavaStatusLegacyResponse';
export declare function statusLegacy(host: string, port?: number, options?: JavaStatusOptions): Promise<JavaStatusLegacyResponse>;
