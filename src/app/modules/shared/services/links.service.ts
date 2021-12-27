import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LiveFunctionService} from './liveFunction.service';
import {
  CREATE_LINK,
  GET_FILE_CONTENT,
  GET_LINKS,
  GET_PACKAGE_INFO_ON_CLIENT,
  LISTEN_LINK,
  UPDATE_PACKAGE_ON_CLIENT
} from '../constants/liveFunctions.constants';
import {LinkInterface} from '../interfaces/link.interface';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private liveFunctionService: LiveFunctionService) {
  }

  getLinks(links: LinkInterface[]): Observable<LinkInterface[]> {
    return this.liveFunctionService.subscribe(GET_LINKS, links);
  }

  getPackageInfoOnClient(link: LinkInterface): Observable<any> {
    return this.liveFunctionService.subscribe(GET_PACKAGE_INFO_ON_CLIENT, link);
  }

  updatePackageOnClient(link: LinkInterface): Observable<any> {
    return this.liveFunctionService.subscribe(UPDATE_PACKAGE_ON_CLIENT, link);
  }

  listenLink(link: LinkInterface): Observable<any> {
    return this.liveFunctionService.subscribe(LISTEN_LINK, link);
  }

  postLink(client: string, packageId: string): Observable<void> {
    return this.liveFunctionService.subscribe(CREATE_LINK, {client, packageId});
  }

  getFileContent(filePath: string): Observable<string> {
    return this.liveFunctionService.subscribe(GET_FILE_CONTENT, filePath);
  }
}
