import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from './animations';
import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'angular-router-sample';
  constructor(public messageService: MessageService) {
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
