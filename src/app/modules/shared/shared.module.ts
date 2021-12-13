import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTemplateComponent} from "./pages/page-template/page-template.component";
import {RouterModule} from "@angular/router";
import {PackageComponent} from './components/package/package.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    PageTemplateComponent,
    PackageComponent
  ],
  exports: [
    PackageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ]
})
export class SharedModule {
}
