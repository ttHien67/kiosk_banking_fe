import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent implements OnInit {

  @Input() type: any;
  @Input() item: any;
  @Input() listService: any;
  @Input() listEmployee: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  form: any;
  isSubmit = false;

  listStatus = [
    {
      id: 0,
      name: "No-Start"
    },
    {
      id: 1,
      name: "In Progress"
    },
    {
      id: 2,
      name: "Done"
    },
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.item);
    
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      serviceId: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });

    if (this.item) {
      this.f.code.disable();
      this.form.patchValue(this.item);
    }
  }

  get f() {
    return this.form.controls;
  }

  close() {
    this.passEntry.emit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      return;
    } else {
      if (this.item) {
        this.update();
      } else {
        this.create();
      }
    }
    this.isSubmit = false;
  }

  create() {
    this.ticketService.createTicket(this.form.value).subscribe(res => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);

      } else {
        this.toastService.error(res.errorDesc);
      }
    })
  }

  update() {
    this.ticketService.updateTicket(this.form.value).subscribe(res => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc);
      }
    })
  }
}
