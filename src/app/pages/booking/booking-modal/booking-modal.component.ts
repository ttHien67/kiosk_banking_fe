import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {

  @Input() item: any;
  @Input() listService: any;
  @Output() passEntry : EventEmitter<any> = new EventEmitter();
  
  form: any;
  isSubmit = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      date: [this.getDate()],
      time: [this.getTime()],
      employeeId: [null],
      serviceId: [this.item?.id, [Validators.required]]
    })
  }

  get f() {
    return this.form.controls;
  }

  getDate() {
    const d = new Date();
    return (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());

  }

  getTime() {
    const d = new Date();
    return (d.getHours() + ':' + (d.getMinutes()) + ':' + d.getSeconds());
  }

  close() {
    this.passEntry.emit();
  }

  submit() {
    if(this.form.status === 'INVALID'){
      return;
    }
  }

}
