import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {  
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

export const AccountRoutingModule = RouterModule.forChild(routes);