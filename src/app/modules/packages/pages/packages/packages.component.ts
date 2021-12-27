import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PackagesService} from '../../../shared/services/packages.service';
import {UiHelperService} from '../../../shared/services/ui-helper.service';
import {PackageImporterComponent} from '../package-importer/package-importer.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  public packages: any[] = [];
  @Input('selectedPackage') selectedPackage: string | undefined;
  @Output() selectedPackageChange = new EventEmitter<string>();
  @Input('isSelectionMode') isSelectionMode: boolean = false;
  @Input('disabledPaths') disabledPaths: string[] = [];
  @Output() packageSelected = new EventEmitter<string>();

  constructor(private packagesService: PackagesService,
              private uiHelperService: UiHelperService) {
  }

  ngOnInit(): void {
    this.packagesService.getPackages(this.packages).subscribe(packages => {
      // @ts-ignore
      this.packages = packages
    })
  }

  addPackage() {
    this.uiHelperService.openDialogWithComponent(PackageImporterComponent, 1000)
  }

  isDisabled(path: string) {
    return this.disabledPaths.some(p => p === path)
  }

  onSelectPackage(packageSelect: any) {
    this.packageSelected.emit(packageSelect.value);
    this.selectedPackageChange.emit(packageSelect.value);
  }
}
