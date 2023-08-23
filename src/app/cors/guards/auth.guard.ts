import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { AuthService } from 'src/app/service/module/auth.service';
@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUser();
        if (currentUser) {
            // if(currentUser.roleCode === 'EMPLOYEE'){
            //     this.router.navigate(['/management/booking-management']);
            //     return true;
            // }else return true;
            
            // logged in so return true
            // get all permission of page with logged in user
            // await this.permissionService.getPermissions(state.url, currentUser.userId).toPromise();
            // // check user don't have permission VIEW
            // if (this.permissionService.authData?.VIEW === 'N') {
            //     this.router.navigate(['/home-page']);
            //     return false;
            // }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/auth/login']);
        return false;
    }
}
