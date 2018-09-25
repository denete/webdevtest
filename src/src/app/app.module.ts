import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PromotionListComponent,
    PromotionDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
