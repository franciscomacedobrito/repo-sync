import {Component, Input, OnInit} from '@angular/core';
import {LinksService} from '../../services/links.service';

@Component({
  selector: 'app-file-compare',
  templateUrl: './file-compare.component.html',
  styleUrls: ['./file-compare.component.scss']
})
export class FileCompareComponent implements OnInit {

  @Input('differences') differences: any;
  public loading = true;
  public left: string | undefined;
  public right: string | undefined;
  public selectedFile: string | undefined;
  public isSideToSide = true;

  constructor(private linksService: LinksService) {

  }

  ngOnUpdate() {

  }

  ngOnInit(): void {
    this.compareFiles(this.differences[0])
  }

  onCompareResults($event: any) {
    console.log('diffResults', $event);
  }

  compareFiles(dif: any) {
    this.selectedFile = dif.name1;
    this.linksService.getFileContent(dif.path1 + '\\' + dif.name1).subscribe(left => {
      this.loading = true;
      this.left = left;
      this.linksService.getFileContent(dif.path2 + '\\' + dif.name2).subscribe(right => {
        this.right = right;
        this.loading = false;
      })
    })
  }

  sideChanged(value: any) {
    this.isSideToSide = value.checked;
  }
}
