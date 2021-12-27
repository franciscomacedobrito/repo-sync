import {Component, OnInit} from '@angular/core';
import {LinksService} from '../../../shared/services/links.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-link-creator',
  templateUrl: './link-creator.component.html',
  styleUrls: ['./link-creator.component.scss']
})
export class LinkCreatorComponent implements OnInit {
  public client: string | undefined;
  public package: string | undefined;
  disabledPackages: string[] = [];
  sBind: any;

  constructor(private linkService: LinksService,
              private notifierService: NotifierService,
              private dialogRef: MatDialogRef<LinkCreatorComponent>,) {
  }

  ngOnInit(): void {
  }

  selectClient(selectedClient: string) {
    this.client = selectedClient;
    this.sBind = null;
  }

  selectPackage(selectedPackage: string) {
    this.package = selectedPackage;
  }

  createLink() {
    if (this.client && this.package) {
      this.linkService.postLink(this.client, this.package).subscribe(() => {
        this.dialogRef.close();
        this.notifierService.show({
          type: 'success',
          message: 'Link created'
        })
      })
    }
  }
}
