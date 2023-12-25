import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
 // styleUrl: './company.component.css',
  providers: [CompanyService]
})
export class CompanyComponent {

  records: Company[];
  private subscription: Subscription;
  constructor(private companyService: CompanyService) { }
 //response:Observable<Company[]>;
  ngOnInit() {
  //this.records=this.companyService.getApiRecords();
    console.log(this.companyService.getApiRecords());
   this.companyService.getApiRecords();
   this.subscription =this.companyService.recordsChanged.subscribe((records: Company[]) => {
     this.records = records;
     console.log(this.records);
   });
  }
  onEditItem(index: number) {
    this.companyService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}



 