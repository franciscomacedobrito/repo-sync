import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LinksComponent} from './pages/links/links.component';
import {routes} from './links.routing';
import {LinkComponent} from './components/link/link.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LinkCreatorComponent} from './components/link-creator/link-creator.component';
import {PackagesModule} from '../packages/packages.module';


@NgModule({
  declarations: [
    LinksComponent,
    LinkComponent,
    LinkCreatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    MatTooltipModule,
    PackagesModule
  ]
})
export class LinksModule {
}
