import { Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { homeRoute } from './Modules/Home/home.routes';
// import { announcementRoute } from './Modules/Announcement/announcement.routes';
import { messagesRoute } from './Modules/Messages/messages.routes';
import { accountRoute } from './Modules/Account/account.routes';
import { classesRoute } from './Modules/Classes/classes.routes';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {path: 'main/login', component: LoginComponent},
    {path: 'main', component: MainpageComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./Modules/Home/home.routes').then(r=>homeRoute)
            },
            {
                path: 'classes',
                loadChildren: () => import('./Modules/Classes/classes.routes').then(r=>classesRoute)
            },
            {
                path: 'messages',
                loadChildren: () => import('./Modules/Messages/messages.routes').then(r=>messagesRoute)
            },
            {
                path: 'account',
                loadChildren: () => import('./Modules/Account/account.routes').then(r=>accountRoute)
            },
            {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'main/login', pathMatch: 'full'}
];
