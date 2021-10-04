import { Component, OnInit, HostListener, Input } from '@angular/core';
import { PROMO_OBJECT } from 'src/mock-promo';
import { PromoService } from '../promo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mockup-list',
  templateUrl: './mockup-list.component.html',
  styleUrls: ['./mockup-list.component.css'],
})
export class MockupListComponent implements OnInit {
  @Input() promo_id?: string;

  promotions: PROMO_OBJECT[] = [];
  next_draw_date: Date = new Date();
  selected_promo: any;

  show_list: boolean = true;
  show_details_481: boolean = false; //for display > 480px wide
  show_details_480: boolean = false; //for display <= 480px wide

  constructor(
    private promoService: PromoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.promo_id) {
      this.showPromoDetail(this.promo_id);
    } else {
      this.getMockPromos(); //this call simulates calling a page function to get page-related data
    }
  }

  //there is a problem with this. Rendering this in the "mobile emulator window" of Chrome,
  //when the window size reaches about 500, the reported innerWidth jumps up to 600+ and only
  //reports a value of under 480 when the window width is a mere sliver.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 480) {
      this.show_details_481 = true;
      this.show_details_480 = false;
    } else if (event.target.innerWidth <= 480) {
      this.show_details_481 = false;
      this.show_details_480 = true;
    }
  }

  // getMockPromos() subscribes to an observable in a service to emulate api interaction for data retrieval
  getMockPromos() {
    this.promoService
      .getPromos()
      .subscribe((promos) => (this.promotions = promos));

    this.getNextDrawDate(this.promotions);
  }

  getNextDrawDate(promotions: PROMO_OBJECT[]) {
    for (let i = 0; i < promotions.length; i++) {
      //since 'next_draw_date' is not an explicit property of the promo object,
      //we sort the drawings array and grab the 0-index drawing_date and assign that
      //to a newly injected property ('next_draw_date') in the promo object to put it in the angular model

      promotions[i].drawings.sort(this.sortByDrawDate);

      this.promotions[i].next_draw_date = new Date(
        promotions[i].drawings[0].drawing_date
      ).toLocaleString();

      promotions[i].drawings.sort(this.sortByEntryDate);

      this.promotions[i].entry_deadline = new Date(
        promotions[i].drawings[0].entry_deadline
      ).toLocaleString();

      this.promotions[i].promo_id = 'promo0' + (i + 1);
    }
  }

  //the sort function to sort drawings by drawing_date
  sortByDrawDate(date_a: any, date_b: any) {
    let date_1: Date = new Date(date_a.drawing_date);
    let date_2: Date = new Date(date_b.drawing_date);

    if (date_1 < date_2) {
      return -1;
    }
    if (date_1 > date_2) {
      return 1;
    }
    return 0;
  }

  sortByEntryDate(date_a: any, date_b: any) {
    let date_1: Date = new Date(date_a.entry_deadline);
    let date_2: Date = new Date(date_b.entry_deadline);

    if (date_1 < date_2) {
      return -1;
    }
    if (date_1 > date_2) {
      return 1;
    }
    return 0;
  }

  showPromoDetail(id: string) {
    console.log('promo id = ' + id);

    for (let i = 0; i < this.promotions.length; i++) {
      if (this.promotions[i].promo_id == id) {
        this.selected_promo = this.promotions[i];
        break;
      }
    }

    //remove the "Cash Prize" portion of the string
    for (let i = 0; i < this.selected_promo.drawings.length; i++) {
      let tmpstr: string = this.selected_promo.drawings[i].prize;
      let index: number = tmpstr.indexOf(' ');
      this.selected_promo.drawings[i].prize = tmpstr.slice(0, index);
    }

    this.selected_promo.num_entries = this.selected_promo.entries.length;

    this.show_list = false;

    if (window.innerWidth > 480) {
      this.show_details_481 = true;
      this.show_details_480 = false;
    } else if (window.innerWidth <= 480) {
      this.show_details_481 = false;
      this.show_details_480 = true;
    }
  }
}
