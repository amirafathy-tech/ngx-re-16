import { Component } from '@angular/core';
import { ProjectService } from './project.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Project } from './project.model';
import { ApiService } from '../ApiService.service';
import { CompanyService } from '../company/company.service';
import { CityService } from '../city/city.service';
import { ProfitService } from '../profit/profit.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  //styleUrl: './project.component.css',
  providers:[ProjectService,ApiService,CompanyService,CityService,ProfitService]
})
export class ProjectComponent {

  records: Project[];
  private subscription: Subscription;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
   this.projectService.getApiRecords();
   this.subscription =this.projectService.recordsChanged.subscribe((records: Project[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.projectService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
