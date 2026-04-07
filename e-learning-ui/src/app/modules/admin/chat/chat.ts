import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../users/user.service';
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from 'primeng/inputtext';
import { ChatService } from './chat.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  providers:[ConfirmationService],
  imports: [ InputGroupModule, InputGroupAddonModule, InputTextModule, DatePipe]
})
export class Chat {

  private usersService = inject(UserService);
  private chatService = inject(ChatService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);


  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;


  messages = this.chatService.messages;

  ngOnInit(): void {
    this.usersService.loadUsers();

  }

  selectedChatUser: any = {
    attributes: {
      profilePicture: ['https://randomuser.me/api/portraits/men/1.jpg']
    },
    firstName: '',
    lastName: ''
  };

  selectChatUser(user: any) {
    this.selectedChatUser = user;
    this.chatService.loadMessages(user.id);
  }





}
