import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HppComponent } from './hpp/hpp.component';
import { DropInComponent } from './drop-in/drop-in.component';
import { FullFeaturedCardComponent } from './full-featured-card/full-featured-card.component';
import { SplitCardComponent } from './split-card/split-card.component';
import { WeChatComponent } from './we-chat/we-chat.component';
import { CardComponent } from './card/card.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { RedirectComponent } from './redirect/redirect.component';
@NgModule({
  declarations: [
    AppComponent,
    HppComponent,
    DropInComponent,
    FullFeaturedCardComponent,
    SplitCardComponent,
    WeChatComponent,
    CardComponent,
    RedirectComponent,
    InstructionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
