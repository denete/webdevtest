import { Drawing } from 'model/drawing';
import { Entry } from 'model/entry';

export class Promotion {
    name: string;
    image_url: string;
    summary: string;
    drawings: Drawing[];
    entries: Entry[];
    
    constructor(obj: any) {
        console.log (obj);
        this.name = obj.promotion_name;
        this.image = obj.promo_image_url;
    }
}
