import { Routes } from "@angular/router";
import { MainMessagesComponent } from "./main-messages/main-messages.component";
import { SendComponent } from "./send/send.component";
import { ViewComponent } from "./view/view.component";
import { ReplyComponent } from "./reply/reply.component";

export const messagesRoute: Routes = [
    {path: 'messagepage', component: MainMessagesComponent,
        children: [
            {path: 'messages', component: SendComponent, 
                children: [
                    {path: 'view/:sid', component: ViewComponent},
                ]
            },
            {path: 'reply', component: ReplyComponent},
            {path: '', redirectTo: 'messages', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo:'messagepage', pathMatch: 'full'}
]  