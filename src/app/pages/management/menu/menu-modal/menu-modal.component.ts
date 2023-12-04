import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/module/auth.service';
import { MenuService } from 'src/app/service/module/menu.service';
import { ScreenService } from 'src/app/service/module/screen.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css'],
})
export class MenuModalComponent implements OnInit {
  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  nameImage: any;
  url: any;

  listIcon = [
    {
      name: 'nc-bank',
    },
    {
      name: 'nc-calendar-60',
    },
    {
      name: 'nc-single-02',
    },
    {
      name: 'nc-book-bookmark',
    },
    {
      name: 'nc-tv-2',
    },
    {
      name: 'nc-bullet-list-67',
    },
  ];
  listRole = [
    {
      name: 'EMPLOYEE',
    },
    {
      name: 'ADMIN',
    },
  ];
  userId: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.userId = this.authService.currentUser().userId;
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      path: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      roleCode: [null, [Validators.required]],
    });

    if (this.item) {
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
    const json = {
      ...this.form.value,
      creator: this.userId,
    };

    this.menuService.createMenu(json).subscribe((res) => {
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
    };
    this.menuService.updateMenu(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Notification');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Notification');
      }
    });
  }
}
