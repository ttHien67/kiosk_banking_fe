import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth.models';
import { GlobalVariable } from 'src/app/store/global.variable';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  public currentUser() {
    if (!GlobalVariable.getAuth().currentUser) {
      GlobalVariable.restoreAuth();
    }
    this.user = GlobalVariable.getAuth().currentUser;
    return this.user;
  }

  login(json: any) {
    return this.http.post<any>(CommandURL.LOGIN + '/login', json).pipe(
      map((data) => {
        if (data && data.token) {
          sessionStorage.setItem('X-Token', data.token);
          const authenticationData = {
            currentUser: {
              userId: data.user.id,
              name: data.user.name,
              role: data.user.role,
            },
          };
          GlobalVariable.setAuth(authenticationData);
          // sessionStorage.setItem("user", base64EncodeUnicode(JSON.stringify(authenticationData)))
        }
        return data.user;
      })
    );
  }

  logout() {
    GlobalVariable.clearVariables();
    // localStorage.removeItem('note');
    this.user = null;
    this.router.navigate(['/account/auth/login']);
    // this.user = null;
  }
}
