import { Component } from '@angular/core';
import { AreaService } from './area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
 // styleUrl: './area.component.css',
  providers:[AreaService]
})
export class AreaComponent {

}
