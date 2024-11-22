import { Routes } from "@angular/router";
import { MainMessagesComponent } from "./main-messages/main-messages.component";
import { ViewMessagesComponent } from "./view-messages/view-messages.component";

export const messagesRoute: Routes = [
    {path: 'messagepage', component: MainMessagesComponent,
        children: [
            {path: 'viewmessages', component: ViewMessagesComponent},
            {path: '', redirectTo: 'viewmessages', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'messagepage', pathMatch: 'full'}
];