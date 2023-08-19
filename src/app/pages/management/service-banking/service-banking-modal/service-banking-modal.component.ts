import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';

@Component({
  selector: 'app-service-banking-modal',
  templateUrl: './service-banking-modal.component.html',
  styleUrls: ['./service-banking-modal.component.scss']
})
export class ServiceBankingModalComponent implements OnInit {

  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  form: any;
  isSubmit = false;
  url: any;
  listService: any;
  files: File[] = [];
  nameImage: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private serviceBankingService: ServiceBankingService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.nameImage = event.target.files[0].name;
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })

    if(this.item){
      this.form.patchValue(this.item);   
    }
  }


  get f() {
    return this.form.controls;
  }

  cancel() {
    this.activeModal.close();
  }

  submit() {
    this.isSubmit = true;
    if(this.form.status === "INVALID"){
      return;
    }

    if(this.item){
      this.update();
    }else this.create();

    this.isSubmit = false;
  }

  create(){
    const json = {
      ...this.form.value,
      image: this.nameImage
    }
    
    this.serviceBankingService.createService(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.listService = res.data;
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);
      }else{
        this.toastService.error(res.errorDesc);
      }
    })

  }

  update(){
    const json = {
      ...this.form.value,
      image: this.nameImage
    }
    
    this.serviceBankingService.updateService(json).subscribe(res => {
      if(res.errorCode === '0'){
        this.toastService.success(res.errorDesc);
        this.passEntry.emit(res);
      }else{
        this.toastService.error(res.errorDesc);
      }
    })
  }



}
