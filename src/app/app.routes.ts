import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LabslistComponent } from './components/labslist/labslist.component';
import { AppComponent } from './app.component';


import { DeleteLabComponent } from './components/labslist/labslist.component'
import { AuthGuard } from './services/auth.guard';



const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    {path:'home', component:HomeComponent},
    { path: 'login', component: LoginComponent },
    
    { path: 'lablist', component: LabslistComponent }
];

export const appRouting = RouterModule.forRoot(appRoutes, {useHash: true});

export const entryComponents = [DeleteLabComponent];