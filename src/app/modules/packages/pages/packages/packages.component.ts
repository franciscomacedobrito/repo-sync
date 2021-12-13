import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../../../shared/services/packages.service";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  public packages: string[] = [];

  constructor(private packagesService: PackagesService) {
  }

  ngOnInit(): void {
    this.packagesService.getPackages(this.packages).subscribe(packages => {
      // @ts-ignore
      this.packages = packages.map(pack => pack.path)
    })
  }
}
