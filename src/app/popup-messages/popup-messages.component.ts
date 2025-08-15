import { Component,Input, OnChanges, SimpleChanges , Output} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-messages',
  standalone: true,
  imports: [ToastModule, RippleModule,  CommonModule],
  templateUrl: './popup-messages.component.html',
  styleUrl: './popup-messages.component.css',
  providers:[MessageService]
})
export class PopupMessagesComponent implements OnChanges{
  @Input() messageType?:string;
  @Input() displayMessage?:boolean;
  @Input() message?:string;

  @Output() messageHandled = new EventEmitter<void>();
  constructor(private messageService : MessageService){
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("entering")
    if(changes['message'] && this.messageType && this.message){
      if(this.messageType === "success"){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
        this.messageHandled.emit();
      }
      if(this.messageType === "info"){
        this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message  });
        this.messageHandled.emit();
      }
      if(this.messageType === "warn"){
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: this.message  });
        this.messageHandled.emit();
      }
      if(this.messageType === "error"){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
        this.messageHandled.emit();
      }
    }
  }

}
