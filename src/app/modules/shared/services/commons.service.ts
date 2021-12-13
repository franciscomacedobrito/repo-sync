import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LiveFunctionService} from "./liveFunction.service";
import {ERROR} from '../constants/liveFunctions.constants';
import {ServerErrorInterface} from '../interfaces/server-error.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private liveFunctionService: LiveFunctionService) {
  }

  getErrors(): Observable<ServerErrorInterface> {
    return this.liveFunctionService.subscribe(ERROR);
  }
}
