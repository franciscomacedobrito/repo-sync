import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTemplateComponent} from './pages/page-template/page-template.component';
import {RouterModule} from '@angular/router';
import {PackageComponent} from './components/package/package.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SyncStatusComponent} from './components/sync-status/sync-status.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxTextDiffModule} from 'ngx-text-diff';
import {FileCompareComponent} from './components/file-compare/file-compare.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    PageTemplateComponent,
    PackageComponent,
    SyncStatusComponent,
    FileCompareComponent
  ],
  exports: [
    PackageComponent,
    SyncStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    NgxTextDiffModule,
    MatRippleModule,
    MatSlideToggleModule
  ]
})
export class SharedModule {
}
