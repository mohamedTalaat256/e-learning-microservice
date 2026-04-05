import { Component, inject } from '@angular/core';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { Avatar } from "primeng/avatar";
import { Menu } from "primeng/menu";
import { Motion } from "primeng/motion";
import { OverlayBadge } from "primeng/overlaybadge";
import { ConfirmDialog } from "primeng/confirmdialog";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { Badge } from "primeng/badge";
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-chat',
 // imports: [Dialog, Button, Menu, Motion, Avatar, ConfirmDialog, IconField, InputIcon, OverlayBadge, Badge],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  providers:[ConfirmationService]
})
export class Chat {

    private usersService = inject(UserService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);


  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;

  ngOnInit(): void {
    this.usersService.loadUsers();

  }




}
