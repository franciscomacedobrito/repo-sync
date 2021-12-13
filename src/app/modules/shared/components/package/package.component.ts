import {Component, Input, OnInit} from '@angular/core';
import {PackageInterface} from "../../interfaces/package.interface";
import {PackagesService} from "../../services/packages.service";

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @Input('path') path: string = '';
  public pack: PackageInterface | undefined;

  constructor(private packageService: PackagesService) {
  }

  ngOnInit(): void {
    this.packageService.getPackageInfo(this.path).subscribe(data => {
      this.pack = data
    });
  }

}
