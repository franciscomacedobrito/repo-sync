import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LiveFunctionService} from './liveFunction.service';
import {ERROR, GET_DATABASE, NOTIFY_CLIENT} from '../constants/liveFunctions.constants';
import {ServerErrorInterface} from '../interfaces/server-error.interface';
import {NotificationInterface} from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private liveFunctionService: LiveFunctionService) {
  }

  public static getStorageItem(storage: Storage, itemName: string): any {
    const item = storage[itemName];
    if (typeof item !== 'undefined') {
      return item.indexOf('{') === -1 ? item : JSON.parse(item);
    }
  }

  public static setStorageItem(storage: Storage, key: string, value: any): void {
    if (typeof value === 'object') {
      storage.setItem(key, JSON.stringify(value));
    } else {
      storage.setItem(key, value);
    }
  }

  getErrors(): Observable<ServerErrorInterface> {
    return this.liveFunctionService.listenServer(ERROR);
  }

  getNotifications(): Observable<NotificationInterface> {
    return this.liveFunctionService.listenServer(NOTIFY_CLIENT);
  }

  getDataBase(): Observable<ServerErrorInterface> {
    return this.liveFunctionService.listenServer(GET_DATABASE);
  }
}
