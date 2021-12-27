import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sync-status',
  templateUrl: './sync-status.component.html',
  styleUrls: ['./sync-status.component.scss']
})
export class SyncStatusComponent implements OnInit {

  @Input('differences') differences: any;
  @Input('status') status: string | undefined;
  @Input('connected') connected: boolean | undefined;
  @Input('visible') visible: boolean | undefined;
  @Output() doUpdate = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  update(): void {
    this.doUpdate.emit();
  }

}
