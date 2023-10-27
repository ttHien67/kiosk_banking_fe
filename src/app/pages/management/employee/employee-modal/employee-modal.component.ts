import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent implements OnInit {
  @Input() type: any;
  @Input() item: any;
  @Input() listRole: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;

  listQuantity = [
    {
      code: 5,
    },
    {
      code: 10,
    },
    {
      code: 15,
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      room: [null, [Validators.required]],
      maxCustomer: [null, [Validators.required]],
      role: [null, [Validators.required]],

      userName: [null],
      password: [null],
      roleCode: [null],
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
    this.f.roleCode.patchValue('EMPLOYEE');

    this.employeeService.createEmployee(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc);
      }
    });
  }

  update() {
    this.employeeService.updateEmployee(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc);
      }
    });
  }
}
