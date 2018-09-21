import { Drawing } from 'model/drawing';
import { Entry } from 'model/entry';

export interface Promotion {
    name: string;
    image_url: string;
    summary: string;
    drawings: Array<Drawing>;
    entries: Array<Entry>;
}
