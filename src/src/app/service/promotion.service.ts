import { Injectable } from '@angular/core';

import * as moment from 'moment';

import * as data from 'data/webdevtest-data.json';

import { Promotion } from 'model/promotion';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    private serverTime: Date;
    private promotions: Promotion[];

    private promotionsLoaded = false;

    constructor() {}

    private getPromotionsFromServer() {
        this.serverTime = data.server_time;
        this.promotions = data.promotion_objects;

        this.promotionsLoaded = true;
    }

    public getPromotions(): Promotion[] {
        if (!this.promotionsLoaded) {
            this.getPromotionsFromServer();
        }
        return this.promotions;
    }

    public getPromotionById(id: number) {
        if (!this.promotionsLoaded) {
            this.getPromotionsFromServer();
        }
        return this.promotions[id];
    }

    public getNextDrawDate(id): Date {
        if (!this.promotionsLoaded) {
            this.getPromotionsFromServer();
        }

        const drawingDates = this.promotions[id].drawings.map(item => item.drawing_date);
        const serverTime = this.serverTime;
        let nextDrawingDate = drawingDates[0];
        let difference = moment(nextDrawingDate).diff(serverTime);

        for(let i = 0, len = drawingDates.length; i < len; i++) {
            let currentDifference = moment(drawingDates[i]).diff(serverTime);

            if (currentDifference <= difference) {
                nextDrawingDate = drawingDates[i];
                difference = currentDifference;
            }
        }

        return nextDrawingDate;
    }

    // TODO code duplication from line 50-70
    public getNextEntryDeadlineDate(id): Date {
        if (!this.promotionsLoaded) {
            this.getPromotionsFromServer();
        }

        const entryDeadlines = this.promotions[id].drawings.map(item => item.entry_deadline);
        const serverTime = this.serverTime;
        let nextEntryDeadline = entryDeadlines[0];
        let difference = moment(nextEntryDeadline).diff(serverTime);

        for(let i = 0, len = entryDeadlines.length; i < len; i++) {
            let currentDifference = moment(entryDeadlines[i]).diff(serverTime);

            if (currentDifference <= difference) {
                nextEntryDeadline = entryDeadlines[i];
                difference = currentDifference;
            }
        }

        return nextEntryDeadline;
    }
}
