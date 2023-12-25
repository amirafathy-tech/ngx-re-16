import { Component } from '@angular/core';
import { MethodofCalcService } from './method-of-calc.service';
import { MethodofCalc } from './method-of-calc.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-method-of-calc',
  templateUrl: './method-of-calc.component.html',
 // styleUrl: './method-of-calc.component.css',
  providers: [MethodofCalcService]
})
export class MethodOfCalcComponent {

  records: MethodofCalc[];
  private subscription: Subscription;
  constructor(private methodofCalcService: MethodofCalcService) { }

  ngOnInit() {
    this.records = this.methodofCalcService.getRecords();
    this.subscription = this.methodofCalcService.recordsChanged
      .subscribe(
        (records: MethodofCalc[]) => {
          this.records = records;
        }
      );
  }
  onEditItem(index: number) {
    this.methodofCalcService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
