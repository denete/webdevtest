import { Injectable } from '@angular/core';
import { PROMO_OBJECT } from 'src/mock-promo';
import { MOCK_PROMO_DATA } from 'src/mock-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  constructor() {}

  getPromos(): Observable<PROMO_OBJECT[]> {
    const promos = of(MOCK_PROMO_DATA.promotion_objects);
    return promos;
  }

  getPromo(name: string): Observable<PROMO_OBJECT> {
    const promo = MOCK_PROMO_DATA.promotion_objects.find(
      (h) => h.promotion_name === name
    )!;
    return of(promo);
  }
}
