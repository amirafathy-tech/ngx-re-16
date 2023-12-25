import { Component, OnInit } from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  // navigationArrow$: Observable<string>;

  // constructor(private _rtlService: RtlService) {}

  // ngOnInit(): void {
  //     this.navigationArrow$ = this._rtlService.rtl.pipe(
  //         map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
  //     );
  // }
  tabs: { title: string; content: string }[] = [];

  constructor() {
      for (let i = 1; i <= 15; i++) {
          this.tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
      }
  }

}

