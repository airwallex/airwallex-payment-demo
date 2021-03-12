import { Component } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular';
  routes = routes.slice(1);
  redirectTo(path: string = '') {
    window.location.href = path;
  }
}
