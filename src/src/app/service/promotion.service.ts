import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as data from 'data/webdevtest-data.json';

import { Promotion } from 'model/promotion'

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor() {}

    public getPromotions(): Observable<Array<Promotion>> {
        return data.promotion_objects.map((promotionData) => {
            return promotionData as Promotion;
        });
     }
}
