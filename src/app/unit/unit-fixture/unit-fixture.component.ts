import { Component } from '@angular/core';
import { UnitFixtureService } from './unit-fixture.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UnitFixture } from './unit-fixture.model';

@Component({
  selector: 'app-unit-fixture',
  templateUrl: './unit-fixture.component.html',
  // styleUrl: './unit-fixture.component.css',
  providers: [UnitFixtureService]
})
export class UnitFixtureComponent {

  records: UnitFixture[];
  private subscription: Subscription;
  constructor(private unitFixtureService: UnitFixtureService) { }

  ngOnInit() {
    this.unitFixtureService.getApiRecords();
    this.subscription = this.unitFixtureService.recordsChanged.subscribe((records: UnitFixture[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.unitFixtureService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
