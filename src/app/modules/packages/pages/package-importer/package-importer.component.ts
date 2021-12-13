import {Component, OnInit, ViewChild} from '@angular/core';
import {PackagesService} from "../../../shared/services/packages.service";
import {PackageInterface} from "../../../shared/interfaces/package.interface";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-package-importer',
  templateUrl: './package-importer.component.html',
  styleUrls: ['./package-importer.component.scss']
})
export class PackageImporterComponent implements OnInit {
  public packageToAdd: PackageInterface | undefined;
  // @ts-ignore
  @ViewChild('stepper') public stepper: MatStepper;

  // @ts-ignore
  public pathFormControl: FormGroup;

  constructor(private packagesService: PackagesService,
              private notifier: NotifierService,
              private _formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.pathFormControl = this._formBuilder.group({
      path: ['', Validators.required],
    });
    this.pathFormControl.controls.path.setErrors({'validPath': true});
    this.pathFormControl.controls.path.updateValueAndValidity();
  }

  getPackageInfo() {
    const control = this.pathFormControl.controls.path;
    const value = control.value;
    if (value && value != '') {
      control.disable();
      this.packagesService.getPackageInfo(value).subscribe(packageToAdd => {
        control.setErrors({'validPath': null});
        control.enable();
        control.updateValueAndValidity();
        this.packageToAdd = packageToAdd;
        this.stepper.next();
      }, () => {
        control.setErrors({'validPath': true});
        control.enable();
      })
    }
  }

  publishPackage() {
    if (this.packageToAdd) {
      this.packagesService.postPackage(this.pathFormControl.controls.path.value).subscribe(() => {
      })
    }

  }
}
