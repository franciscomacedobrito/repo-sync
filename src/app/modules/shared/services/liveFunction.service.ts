import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {NotifierService} from 'angular-notifier';
import {HistoryService} from './history.service';

@Injectable({
  providedIn: 'root'
})
export class LiveFunctionService {
  // @ts-ignore
  public socket;
  public connected$ = new BehaviorSubject<boolean>(false);
  private connected: boolean | undefined;

  constructor(private notifierService: NotifierService, private historyService: HistoryService) {
    // @ts-ignore
    this.socket = io.default(`${environment.host}`, {transports: ['websocket', 'polling'], withCredentials: true});
    this.socket.on('connect', () => {
      this.connected = true;
      this.connected$.next(this.connected);

      const message = 'Connected to server';
      const type = 'success';

      this.notifierService.show({
        message,
        type
      });
      this.historyService.saveHistory({message, type})
    })
    this.socket.on('disconnect', () => {
      this.connected = false;
      this.connected$.next(this.connected);

      const message = 'Connection to server lost';
      const type = 'info';

      this.notifierService.show({
        message,
        type
      });
      this.historyService.saveHistory({message, type})
    })
  }

  subscribe(funcName: string, data?: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit(funcName, data, (data: any) => {
        if (data?.error) {
          observer.error(data.error);
          return;
        }
        observer.next(data);
      });
    });
  }

  listenServer(funcName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(funcName, (data: any) => {
        if (data.error) {
          observer.error(data.error);
          return;
        }
        observer.next(data);
      });
    });
  }

  toggleConnection() {
    if (this.connected) {
      this.socket.disconnect();
    } else {
      this.socket.connect();
    }
  }

  // TODO currently the acks are still on memory, they must be deleted when an unsubscribe happens
  // an idea could be receiving the ack data on socket.emit, store it, and on unsubscribe delete it
  unsubscribe(): void {

  }

}
