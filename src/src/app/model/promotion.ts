import { Drawing } from './../model/drawing';
import { Entry } from './../model/entry';

export class Promotion {
    name: string;
    image_url: string;
    summary: string;
    drawings: Drawing[];
    entries: Entry[];
}
