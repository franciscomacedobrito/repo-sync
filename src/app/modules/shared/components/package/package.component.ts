import {Component, Input, OnInit} from '@angular/core';
import {PackageInterface} from '../../interfaces/package.interface';
import {PackagesService} from '../../services/packages.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  @Input('path') path: string = '';
  public pack: PackageInterface | undefined;
  private subscription: Subscription | undefined;

  constructor(private packageService: PackagesService) {
  }

  ngOnInit(): void {
    this.subscription = this.packageService.getPackageInfo(this.path).subscribe(data => {
      this.pack = data
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
