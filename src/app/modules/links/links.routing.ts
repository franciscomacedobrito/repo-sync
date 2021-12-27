import {Routes} from '@angular/router';
import {PageTemplateComponent} from '../shared/pages/page-template/page-template.component';
import {LinksComponent} from './pages/links/links.component';

export const routes: Routes = [
  {
    path: 'links',
    component: PageTemplateComponent,
    data: {
      title: 'Links'
    },
    children: [
      {
        path: '',
        component: LinksComponent
      }
    ]
  }
];
