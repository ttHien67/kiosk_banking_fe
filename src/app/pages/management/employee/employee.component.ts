import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  form: any;
  listService: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 0;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null]
    })
  }

  get f() {
    return this.form.controls;
  }

  refresh() {

  }

  create() {

  }

  search() {

  }

  delete(item: any){

  }

  openModal(item: any, type: any) {

  }

  changePageSize(item: any){

  }

  changePage(size: any){

  }

}
