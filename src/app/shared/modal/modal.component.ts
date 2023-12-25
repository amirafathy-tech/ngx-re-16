import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
@Injectable()
export class ModalComponent implements OnInit {
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<ModalComponent>;
  @Output() newConfirmationEvent = new EventEmitter<string>();
  // @Input() modalStyle: any;
  // @Input() modalTitle: any;
  // @Input() modalButtonColor: any;
  // @Input() modalBody: TemplateRef<any>; // Add the modalBody input

  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'lg' });
      this.modalRef.result.then(
        result => {
          console.log(result);
          this.newConfirmationEvent.emit(result);
        },
        reason => {
          console.log(reason);
        }
      );
    });
  }


  // openReusableModal(content: TemplateRef<any>, options?: any): Promise<boolean> {
  //   return new Promise<boolean>(resolve => {
  //     this.modalRef = this.modalService.open(content, options);
  //     this.modalRef.result.then(
  //       result => {
  //         console.log(result);
  //         this.newConfirmationEvent.emit(result);
  //       },
  //       reason => {
  //         console.log(reason);
  //       }
  //     );
  //   });
  // }
}