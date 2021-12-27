import {Component, OnInit} from '@angular/core';
import {LinksService} from '../../../shared/services/links.service';
import {LinkInterface} from '../../../shared/interfaces/link.interface';
import {UiHelperService} from '../../../shared/services/ui-helper.service';
import {LinkCreatorComponent} from '../../components/link-creator/link-creator.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  public links: LinkInterface[] = [];
  private linkCreator: MatDialogRef<LinkCreatorComponent, any> | undefined;

  constructor(private linksService: LinksService, private uiHelperService: UiHelperService) {
  }

  ngOnInit(): void {
    this.linksService.getLinks(this.links).subscribe(links => {
      // @ts-ignore
      this.links = links;
    })
  }

  addLink(): void {
    this.linkCreator = this.uiHelperService.openDialogWithComponent(LinkCreatorComponent);
  }

}
