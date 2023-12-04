import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ScreenService } from 'src/app/service/module/screen.service';
import { TicketService } from 'src/app/service/module/ticket.service';

@Component({
  selector: 'app-screen-modal',
  templateUrl: './screen-modal.component.html',
  styleUrls: ['./screen-modal.component.css'],
})
export class ScreenModalComponent implements OnInit {
  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  nameImage: any;
  url: any;

  active = 1;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      startDate: [null],
      endDate: [null],
      startTime: [null],
      endTime: [null],
    });

    if (this.item) {
      this.form.patchValue(this.item);
      this.f.image.patchValue(null);
      console.log(this.form.value);
    }
  }

  get f() {
    return this.form.controls;
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.nameImage = event.target.files[0].name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
    const json = {
      ...this.form.value,
      image: this.nameImage,
    };

    this.screenService.createScreen(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Notification');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Notification');
      }
    });
  }

  update() {
    const json = {
      ...this.form.value,
      image: this.nameImage || this.f.image.value,
    };
    this.screenService.updateScreen(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Notification');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Notification');
      }
    });
  }

  navChange(event: any) {}
}
