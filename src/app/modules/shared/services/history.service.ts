import {Injectable} from '@angular/core';
import {HistoryInterface} from '../interfaces/history.interface';
import {CommonsService} from './commons.service';
import {BehaviorSubject} from 'rxjs';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  history$ = new BehaviorSubject<HistoryInterface[]>([])

  constructor() {
    window.addEventListener('storage', (data) => {
      if (data.key === 'history') {
        this.history$.next(CommonsService.getStorageItem(localStorage, 'history'))
      }
    });
  }

  saveHistory(history: any): void {
    const newHistory: HistoryInterface = {
      ...history,
      id: uuid(),
      date: new Date().toISOString()
    }
    const temp: HistoryInterface[] = CommonsService.getStorageItem(localStorage, 'history');
    let localHistory: HistoryInterface[] = temp ? temp : [];
    localHistory.push(newHistory);
    CommonsService.setStorageItem(localStorage, 'history', localHistory);
    this.history$.next(localHistory)
  }
}
