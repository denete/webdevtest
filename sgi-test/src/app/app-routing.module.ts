import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockupListComponent } from './mockup-list/mockup-list.component';

const routes: Routes = [
  { path: 'promo_list/:promo', component: MockupListComponent },
  { path: 'index.html', redirectTo: '/promo_list/:promo', pathMatch: 'full' },
  { path: '', redirectTo: '/promo_list/:promo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
