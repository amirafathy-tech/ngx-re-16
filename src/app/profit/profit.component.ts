import { Component } from '@angular/core';
import { ProfitService } from './profit.service';
import { Profit } from './profit.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  // styleUrl: './profit.component.css',
  providers: [ProfitService]
})
export class ProfitComponent {

  records: Profit[];
  private subscription: Subscription;
  constructor(private profitService: ProfitService) { }

  ngOnInit() {
    this.profitService.getApiRecords();
    this.subscription = this.profitService.recordsChanged.subscribe((records: Profit[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.profitService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
