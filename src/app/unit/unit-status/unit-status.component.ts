import { Component } from '@angular/core';
import { UnitStatusService } from './unit-status.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitStatus } from './unit-status.model';

@Component({
  selector: 'app-unit-status',
  templateUrl: './unit-status.component.html',
  // styleUrl: './unit-status.component.css',
  providers: [UnitStatusService]
})
export class UnitStatusComponent {
  
  records: UnitStatus[];
  private subscription: Subscription;
  constructor(private unitStatusService: UnitStatusService) { }

  ngOnInit() {
    this.records = this.unitStatusService.getRecords();
    this.subscription = this.unitStatusService.recordsChanged
      .subscribe(
        (records: UnitStatus[]) => {
          this.records = records;
        }
      );
  }
  onEditItem(index: number) {
    this.unitStatusService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
