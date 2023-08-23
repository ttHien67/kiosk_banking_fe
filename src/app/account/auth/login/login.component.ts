import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/module/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any;
  isSubmit: Boolean = false
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(\'assets/img/login-background.webp\')';
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    })
  }

  get f(){
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmit = true;    
    if(this.form.status === "VALID"){
      this.login();
    }
  }

  login() {
    const json = this.form.value;
    this.authService.login(json).pipe(first()).subscribe(res => {
      if(res) {
        this.router.navigate(["/management"])
        .then(() => {
          window.location.reload();
        });
      }else [
        this.toastService.error("Login failed!")
      ]
      
    })
  }

}
