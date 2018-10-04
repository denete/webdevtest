import { Component, Input, OnInit } from '@angular/core';

import { PromotionService } from '../service/promotion.service';
import { Promotion } from './../model/promotion';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {

    private promotions: Promotion[];
    private dateFormat = 'EEEE, MMMM d, yyyy';

    constructor(private promotionService: PromotionService) { }

    ngOnInit() {
        this.promotions = this.promotionService.getPromotions();
    }

}
