import {Component, Input, OnInit} from '@angular/core';
import {LinkInterface} from '../../../shared/interfaces/link.interface';
import {PackagesService} from '../../../shared/services/packages.service';
import {PackageInterface} from '../../../shared/interfaces/package.interface';
import {LinksService} from '../../../shared/services/links.service';
import {LiveFunctionService} from '../../../shared/services/liveFunction.service';
import {UiHelperService} from '../../../shared/services/ui-helper.service';
import {FileCompareComponent} from '../../../shared/components/file-compare/file-compare.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input('link') link: LinkInterface | undefined;
  public client: PackageInterface | undefined;
  public linkDetails: any;
  public connected: boolean | undefined;
  public versionToolTip = '';
  public status: string | undefined;
  private fileComparer: MatDialogRef<FileCompareComponent, any> | undefined;

  constructor(private packagesService: PackagesService,
              private liveFunctionService: LiveFunctionService,
              private uiHelperService: UiHelperService,
              private linksService: LinksService) {
    liveFunctionService.connected$.subscribe(connected => this.connected = connected);
  }

  ngOnInit(): void {
    if (this.link) {
      // this.packagesService.getPackageInfoById(this.link.client).subscribe(clientInformation => {
      //   this.client = clientInformation;
      // })
      this.linksService.getPackageInfoOnClient(this.link).subscribe(linkDetails => {
        this.linkDetails = linkDetails;
        this.status = linkDetails.package.updated ? 'updated' : 'outdated'
        if (this.fileComparer) {
          this.fileComparer.componentInstance.differences = this.linkDetails.differences.diffSet;
        }
        this.versionToolTip = `Versions are not equal, current repo version is: ${linkDetails.package.currentVersion}`
      })
    }
  }

  listenLink(): void {
    if (this.link) {
      this.linksService.listenLink(this.link).subscribe();
    }
  }

  toggleLink(): void {
    if (this.link) {
      this.link.active = !this.link?.active;
    }
  }

  updateClient() {
    if (this.status !== 'outdated') {
      return;
    }
    this.status = 'updating';
    if (this.link) {
      this.linksService.updatePackageOnClient(this.link).subscribe(() => {
        this.status = 'updated';
      });
    }
  }

  showDifferences(): void {
    this.fileComparer = this.uiHelperService.openDialogWithComponent(FileCompareComponent, 2000, '70vh');
    this.fileComparer.componentInstance.differences = this.linkDetails.differences.diffSet;
  }
}
