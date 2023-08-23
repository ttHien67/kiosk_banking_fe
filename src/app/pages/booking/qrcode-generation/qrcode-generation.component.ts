import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-qrcode-generation',
  templateUrl: './qrcode-generation.component.html',
  styleUrls: ['./qrcode-generation.component.scss']
})
export class QrcodeGenerationComponent implements OnInit {

  qrCodeData: any;
  @Input() data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.qrCodeData = JSON.stringify(this.data);
  }

  close() {
    this.passEntry.emit();
  }

}
