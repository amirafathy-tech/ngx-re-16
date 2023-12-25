import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { Building } from './building.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
 // styleUrl: './building.component.css',
  providers:[BuildingService]
})
export class BuildingComponent {
  records: Building[];
  private subscription: Subscription;
  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
   this.buildingService.getApiRecords();
   this.subscription =this.buildingService.recordsChanged.subscribe((records: Building[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.buildingService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
