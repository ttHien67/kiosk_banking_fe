import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { TicketService } from 'src/app/service/module/ticket.service';

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

  
  getEmployee(){
    this.employeeService.getEmployee({role: [this.item?.id]}).subscribe(res => {
      if(res.errorCode === '0'){
        this.listEmployee = res.data;

        // auto choose teller mapping your role
        let randomTeller = Math.floor(Math.random() * this.listEmployee.length);
        this.f.employeeId.patchValue(this.listEmployee[randomTeller]?.id);
        
      }
    })
  }

  close() {
    this.passEntry.emit();
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
      code: Math.floor(Math.random() * (999 - 100) + 100)
    }

    this.ticketService.createTicket(json).subscribe(res => {
      if(res.errorCode !== '0'){
        this.toastService.error("something was wrong");
      }else{
        this.passEntry.emit(json);
      }
    })
  }

}
