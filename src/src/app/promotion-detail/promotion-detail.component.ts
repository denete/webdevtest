import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Promotion } from '../model/promotion';
import { PromotionService } from '../service/promotion.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {

  @Input() promotion: Promotion;
  private id: number;
  private dateFormat = 'EEEE, MMMM d, yyyy';

  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPromotion();
  }

  getPromotion() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.promotion = this.promotionService.getPromotionById(this.id);
  }

  goBack() {
    this.location.back();
  }

}
