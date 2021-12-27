import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PackageInterface} from '../interfaces/package.interface';
import {LiveFunctionService} from './liveFunction.service';
import {
  GET_PACKAGE_INFO,
  GET_PACKAGE_INFO_BY_ID,
  GET_PACKAGES,
  POST_PACKAGE
} from '../constants/liveFunctions.constants';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packages$ = new BehaviorSubject<Partial<PackageInterface[]>>([]);

  constructor(private liveFunctionService: LiveFunctionService) {
    this.liveFunctionService.subscribe(GET_PACKAGES, []).subscribe(newPackages => {
      this.packages$.next(newPackages);
    });
  }

  getPackages(packages: any): Observable<Partial<PackageInterface[]>> {
    return this.packages$;
  }

  getPackageInfo(filePath: string): Observable<PackageInterface> {
    return this.liveFunctionService.subscribe(GET_PACKAGE_INFO, {filePath});
  }

  getPackageInfoById(id: string): Observable<PackageInterface> {
    return this.liveFunctionService.subscribe(GET_PACKAGE_INFO_BY_ID, id);
  }

  postPackage(filePath: string): Observable<void> {
    return this.liveFunctionService.subscribe(POST_PACKAGE, filePath);
  }
}
