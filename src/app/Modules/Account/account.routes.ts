import { Routes } from "@angular/router";
import { MainAccountComponent } from "./main-account/main-account.component";
import { ViewAccountComponent } from "./view-account/view-account.component";

export const accountRoute: Routes = [
    {path: 'accountpage', component: MainAccountComponent,
        children: [
            {path: 'viewaccount', component: ViewAccountComponent},
            {path: '', redirectTo: 'viewaccount', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'accountpage', pathMatch: 'full'}
];