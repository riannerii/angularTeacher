import { Routes } from "@angular/router";
import { MainHomeComponent } from "./main-home/main-home.component";
import { ViewHomeComponent } from "./view-home/view-home.component";

export const homeRoute: Routes = [
    {path: 'homepage', component: MainHomeComponent,
        children: [
            {path: 'viewhome', component: ViewHomeComponent},
            {path: '', redirectTo: 'viewhome', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'homepage', pathMatch:'full'}
];