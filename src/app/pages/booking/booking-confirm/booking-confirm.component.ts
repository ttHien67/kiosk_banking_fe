import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {

  @Input() item: any;
  @Input() listService: any;
  @Output() passEntry : EventEmitter<any> = new EventEmitter();
  
  form: any;
  isSubmit = false;
  listEmployee: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private ticketService: TicketService,
    private toastService: ToastrService

  ) { }

  ngOnInit() {
    this.initForm();
    this.getEmployee();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      date: [this.getDate()],
      time: [this.getTime()],
      employeeId: [null],
      serviceId: [this.item?.id, [Validators.required]]
    });
    if(this.item){
      this.f.code.disable();
      this.form.patchValue(this.item);
    }
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

  
  getEmployee(){
    this.employeeService.getEmployee({}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listEmployee = res.data;
      }
    })
  }

  close() {
    this.activeModal.dismiss();
  }

  submit() {
    this.isSubmit = true;
    if(this.form.status === 'INVALID'){
      return;
    }

    this.create();
    this.isSubmit = false;
  }


  create() {
    const json = {
      ...this.form.value,
      status: 0,
      code: this.f.code.value
    }
    console.log(json);
    
    this.ticketService.fakeCreateTicket(json).subscribe(res => {
      if(res.errorCode !== '0'){
        this.toastService.error("something was wrong");
      }else{
        this.passEntry.emit(json);
      }
    })
  }

}
