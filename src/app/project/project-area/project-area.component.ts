import { Component } from '@angular/core';
import { ProjectAreaService } from './project-area.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProjectArea } from './project-area.model';

@Component({
  selector: 'app-project-area',
  templateUrl: './project-area.component.html',
  // styleUrl: './project-area.component.css',
  providers: [ProjectAreaService]
})
export class ProjectAreaComponent {

  records: ProjectArea[];
  private subscription: Subscription;
  constructor(private projectAreaService: ProjectAreaService) { }

  ngOnInit() {
    this.projectAreaService.getApiRecords();
    this.subscription = this.projectAreaService.recordsChanged.subscribe((records: ProjectArea[]) => {
      this.records = records;
      console.log(this.records);
    });
  }
  onEditItem(index: number) {
    this.projectAreaService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
