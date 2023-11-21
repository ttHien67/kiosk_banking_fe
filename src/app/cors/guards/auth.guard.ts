import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { AuthService } from 'src/app/service/module/auth.service';
import { MenuService } from 'src/app/service/module/menu.service';
@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(
        private router: Router,
        private authService: AuthService,
        private menuService: MenuService
    ) {
    }

    listMenu:  Array<any> = [];

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUser();
        if (currentUser) {
            if(currentUser?.role === 'EMPLOYEE'){
                const json = {
                    roleCode: [currentUser?.role]
                }
                
                this.menuService.getMenuByRole(json).subscribe(res => {
                    if(res.errorCode === '0'){
                        const result = res.data.some((e: any) => e.path === state.url);
                        if(!result){
                            this.router.navigate(['/account/auth/login']);
                        }
                    } 
                });

                return true;
            }
            
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/auth/login']);
        return false;
    }
}
