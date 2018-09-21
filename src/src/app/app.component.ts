import { Component } from '@angular/core';
import { PromotionService } from './service/promotion.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'webdevtest';
    promotions = [];

    constructor(private promotionService: PromotionService) { }

    getPromotions(): void {
        this.promotions = this.promotionService.getPromotions();
    }

    ngOnInit() {
        this.getPromotions();
    }
}
