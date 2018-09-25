import { Promotion } from 'model/promotion';

export class PromotionCollection {
    serverTime: Date;
    promotions: Promotion[];
    constructor(obj: any) {
        this.serverTime = obj.server_time;
        this.promotions = obj.promotion_objects as Promotion[];
    }
}
