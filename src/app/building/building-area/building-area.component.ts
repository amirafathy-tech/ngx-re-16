import { Component } from '@angular/core';
import { BuildingAreaService } from './building-area.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BuildingArea } from './building-area.model';

@Component({
  selector: 'app-building-area',
  templateUrl: './building-area.component.html',
 // styleUrl: './building-area.component.css',
  providers: [BuildingAreaService]
})
export class BuildingAreaComponent {
  records: BuildingArea[];
  private subscription: Subscription;
  constructor(private buildingAreaService: BuildingAreaService) { }

  ngOnInit() {
    this.records = this.buildingAreaService.getRecords();
    this.subscription = this.buildingAreaService.recordsChanged
      .subscribe(
        (records: BuildingArea[]) => {
          this.records = records;
        }
      );
  }
  onEditItem(index: number) {
    this.buildingAreaService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
