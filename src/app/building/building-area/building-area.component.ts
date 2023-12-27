import { Component } from '@angular/core';
import { BuildingAreaService } from './building-area.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BuildingArea } from './building-area.model';

@Component({
  selector: 'app-building-area',
  templateUrl: './building-area.component.html',
  styleUrls: ['./building-area.component.css'],
  providers: [BuildingAreaService]
})
export class BuildingAreaComponent {

  records: BuildingArea[];
  private subscription: Subscription;
  constructor(private buildingAreaService: BuildingAreaService) { }

  ngOnInit() {
   this.buildingAreaService.getApiRecords();
   this.subscription =this.buildingAreaService.recordsChanged.subscribe((records: BuildingArea[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.buildingAreaService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
