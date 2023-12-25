import { Component } from '@angular/core';
import { BuildingType } from './building-type.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { BuildingTypeService } from './building-type.service';

@Component({
  selector: 'app-building-type',
  templateUrl: './building-type.component.html',
 // styleUrl: './building-type.component.css',
  providers: [BuildingTypeService]
})
export class BuildingTypeComponent {
  
  records: BuildingType[];
  private subscription: Subscription;
  constructor(private buildingTypeService: BuildingTypeService) { }

  ngOnInit() {
   this.buildingTypeService.getApiRecords();
   this.subscription =this.buildingTypeService.recordsChanged.subscribe((records: BuildingType[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.buildingTypeService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
