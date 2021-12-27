import {Component} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {CommonsService} from './modules/shared/services/commons.service';
import {LiveFunctionService} from './modules/shared/services/liveFunction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repo-sync';

  public connected = false;
  public sideBarOpened = true;

  constructor(private notifierService: NotifierService, private commonsService: CommonsService, private liveFunctionServices: LiveFunctionService) {

    liveFunctionServices.connected$.subscribe(connected => this.connected = connected);

    commonsService.getErrors().subscribe(data => {
      this.notifierService.show({
        message: data?.message ? data?.message : 'Error',
        type: 'error'
      });
    })

    commonsService.getNotifications().subscribe(notification => {
      this.notifierService.show({
        message: notification.message,
        type: notification.type
      });
    })
  }

  toggleConnection() {
    this.liveFunctionServices.toggleConnection();
  }
}
