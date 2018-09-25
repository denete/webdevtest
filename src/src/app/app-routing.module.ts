import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: PromotionListComponent },
    { path: 'promo/:id', component: PromotionDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}