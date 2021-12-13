import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LiveFunctionService {
  // @ts-ignore
  private socket;

  constructor() {
    // @ts-ignore
    this.socket = io.default(`${environment.host}`, {transports: ['websocket', 'polling'], withCredentials: true});
  }

  subscribe(funcName: string, data?: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit(funcName, data, (data: any) => {
        if (data.error) {
          observer.error(data.error);
          return;
        }
        observer.next(data);
      });
    });
  }

}
