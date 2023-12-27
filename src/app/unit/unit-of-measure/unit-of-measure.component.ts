import { Component } from '@angular/core';
import { UnitOfMeasureService } from './unit-of-measure.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitOfMeasure } from './unit-of-measure.model';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  // styleUrl: './unit-of-measure.component.css',
  providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent {

  records: UnitOfMeasure[];
  private subscription: Subscription;
  constructor(private unitOfMeasureService: UnitOfMeasureService) { }

  ngOnInit() {
    this.unitOfMeasureService.getApiRecords();
    this.subscription = this.unitOfMeasureService.recordsChanged.subscribe((records: UnitOfMeasure[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.unitOfMeasureService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
