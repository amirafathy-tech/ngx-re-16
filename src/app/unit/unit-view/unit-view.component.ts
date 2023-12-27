import { Component } from '@angular/core';
import { UnitViewService } from './unit-view.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitView } from './unit-view.model';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.component.html',

  providers: [UnitViewService]
})
export class UnitViewComponent {

  records: UnitView[];
  private subscription: Subscription;
  constructor(private unitViewService: UnitViewService) { }

  ngOnInit() {
    this.unitViewService.getApiRecords();
    this.subscription = this.unitViewService.recordsChanged.subscribe((records: UnitView[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.unitViewService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
