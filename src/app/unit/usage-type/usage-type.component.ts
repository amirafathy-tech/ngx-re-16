import { Component } from '@angular/core';
import { UsageTypeService } from './usage-type.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsageType } from './usage-type.model';

@Component({
  selector: 'app-usage-type',
  templateUrl: './usage-type.component.html',
  styleUrls: ['./usage-type.component.css'],
  providers: [UsageTypeService]
})
export class UsageTypeComponent {

  records: UsageType[];
  private subscription: Subscription;
  constructor(private usageTypeService: UsageTypeService) { }

  ngOnInit() {
    this.usageTypeService.getApiRecords();
    this.subscription = this.usageTypeService.recordsChanged.subscribe((records: UsageType[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.usageTypeService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
