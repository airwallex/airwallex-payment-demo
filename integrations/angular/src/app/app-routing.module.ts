import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HppComponent } from './hpp/hpp.component';
import { DropInComponent } from './drop-in/drop-in.component';
import { FullFeaturedCardComponent } from './full-featured-card/full-featured-card.component';
import { SplitCardComponent } from './split-card/split-card.component';
import { WeChatComponent } from './we-chat/we-chat.component';
import { CardComponent } from './card/card.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { RedirectComponent } from './redirect/redirect.component';

interface RouteConfig extends Route {
  linkTitle: string;
}

export const routes: RouteConfig[] = [
  {
    path: '',
    component: InstructionsComponent,
    linkTitle: 'Instructions',
  },
  {
    path: 'card',
    component: CardComponent,
    linkTitle: 'Card',
  },
  {
    path: 'hpp',
    component: HppComponent,
    linkTitle: 'Hosted payment page (HPP)',
  },
  {
    path: 'drop-in',
    component: DropInComponent,
    linkTitle: 'DropIn',
  },
  {
    path: 'full-featured-card',
    component: FullFeaturedCardComponent,
    linkTitle: 'Full Featured Card',
  },
  {
    path: 'split-card',
    component: SplitCardComponent,
    linkTitle: 'Split Card element',
  },
  {
    path: 'wechat',
    component: WeChatComponent,
    linkTitle: 'Wechat element',
  },
  {
    path: 'redirect',
    component: RedirectComponent,
    linkTitle: 'Redirect element',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
