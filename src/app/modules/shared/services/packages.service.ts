import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PackageInterface} from "../interfaces/package.interface";
import {LiveFunctionService} from "./liveFunction.service";
import {GET_PACKAGE_INFO, GET_PACKAGES, POST_PACKAGE} from "../constants/liveFunctions.constants";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private liveFunctionService: LiveFunctionService) {
  }

  getPackages(packages: any): Observable<Partial<PackageInterface[]>> {
    return this.liveFunctionService.subscribe(GET_PACKAGES, packages);
  }

  getPackageInfo(filePath: string): Observable<PackageInterface> {
    return this.liveFunctionService.subscribe(GET_PACKAGE_INFO, {filePath});
  }

  postPackage(filePath: string): Observable<void> {
    return this.liveFunctionService.subscribe(POST_PACKAGE, filePath);
  }
}
