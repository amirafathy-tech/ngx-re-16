import { Component } from '@angular/core';
import { UnitAreaService } from './unit-area.service';
import { UnitArea } from './unit-area.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-unit-area',
  templateUrl: './unit-area.component.html',
  // styleUrl: './unit-area.component.css',
  providers: [UnitAreaService]
})
export class UnitAreaComponent {

  records: UnitArea[];
  private subscription: Subscription;
  constructor(private unitAreaService: UnitAreaService) { }

  ngOnInit() {
    this.unitAreaService.getApiRecords();
    this.subscription = this.unitAreaService.recordsChanged.subscribe((records: UnitArea[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.unitAreaService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
