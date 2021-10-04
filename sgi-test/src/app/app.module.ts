import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockupListComponent } from './mockup-list/mockup-list.component';

@NgModule({
  declarations: [AppComponent, MockupListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [RouterLinkActive],
  bootstrap: [AppComponent],
})
export class AppModule {}
