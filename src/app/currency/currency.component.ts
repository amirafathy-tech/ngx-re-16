import { Component } from '@angular/core';
import { Currency } from './currency.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
 // styleUrl: './currency.component.css',
  providers: [CurrencyService]
})
export class CurrencyComponent {
  records: Currency[];
  private subscription: Subscription;
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.records = this.currencyService.getRecords();
    this.subscription = this.currencyService.recordsChanged
      .subscribe(
        (records: Currency[]) => {
          this.records = records;
        }
      );
  }
  onEditItem(index: number) {
    this.currencyService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
