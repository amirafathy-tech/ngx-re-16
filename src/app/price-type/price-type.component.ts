import { Component } from '@angular/core';
import { PriceType } from './price-type.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { PriceTypeService } from './price-type.service';

@Component({
  selector: 'app-price-type',
  templateUrl: './price-type.component.html',
 // styleUrl: './price-type.component.css',
  providers: [PriceTypeService]
})
export class PriceTypeComponent {

  records: PriceType[];
  private subscription: Subscription;
  constructor(private priceTypeService: PriceTypeService) { }

  ngOnInit() {
    this.records = this.priceTypeService.getRecords();
    this.subscription = this.priceTypeService.recordsChanged
      .subscribe(
        (records: PriceType[]) => {
          this.records = records;
        }
      );
  }
  onEditItem(index: number) {
    this.priceTypeService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
