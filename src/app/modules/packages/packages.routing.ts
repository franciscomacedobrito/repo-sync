import {Routes} from "@angular/router";
import {PackageImporterComponent} from "./pages/package-importer/package-importer.component";
import {PageTemplateComponent} from "../shared/pages/page-template/page-template.component";
import {PackagesComponent} from "./pages/packages/packages.component";

export const routes: Routes = [
  {
    path: 'packages',
    component: PageTemplateComponent,
    data: {
      title: 'Packages'
    },
    children: [
      {
        path: '',
        component: PackagesComponent
      },
      {
        path: 'list',
        component: PackagesComponent
      },
      {
        path: 'add-package',
        component: PackageImporterComponent
      }
    ]
  },
];
