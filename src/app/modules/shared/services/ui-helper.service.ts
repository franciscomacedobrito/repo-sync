import {Injectable, Optional} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {
  constructor(@Optional() private dialog: MatDialog) {
  }

  openDialogWithComponent<T>(component: ComponentType<T>, width: number = 700, height: string = 'auto') {
    return this.dialog.open(component, {
      width: `${width}px`,
      height,
      restoreFocus: false,
      autoFocus: false,
      panelClass: 'no-padding-dialog'
    });
  }
}
