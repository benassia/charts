import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

@Component({
	selector: 'chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

}