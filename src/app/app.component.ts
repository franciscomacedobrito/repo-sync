import {Component} from '@angular/core';
import {LiveFunctionService} from './modules/shared/services/liveFunction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repo-sync';

  constructor(liveFunctionService: LiveFunctionService) {
    liveFunctionService.socket.emit('teste', 'batata', (result: any) => {
      console.log(result)
    })
  }
}
