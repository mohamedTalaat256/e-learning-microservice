import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './user.service';
import { FormInput } from "../../../shared/components/form-input/form-input";
import { User } from '../../../core/model/user.model';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, RippleModule, ToastModule,
    ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule,
    RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule,
    IconFieldModule, ConfirmDialogModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ReactiveFormsModule, FormInput],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  providers: [MessageService, ConfirmationService, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Users  implements OnInit {

  user!: User;
  selectedUsers!: User[] | null;
  submitted: boolean = false;
  statusOptions!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

  userForm!: FormGroup;
  roles = [
    { label: 'ADMIN', value: 'ADMIN' },
   /*  { label: 'USER', value: 'USER' }, */
    { label: 'STUDENT', value: 'STUDENT' },
  ];

  private usersService = inject(UserService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;

    loadingSave = this.usersService.loadingSave;
  userDialog = this.usersService.userDialog;

  ngOnInit(): void {
    this.usersService.loadUsers();


  }


  exportCSV() {
    this.dt.exportCSV();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.initiatForm();
    this.userDialog.set(true);
  }

  editUser(user: User) {
    this.user = { ...user };
    //this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users.set(this.users().filter((val) => !this.selectedUsers?.includes(val)));
        this.selectedUsers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Users Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.userDialog.set(false);
  }

  deleteUser(user: User) {

  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users().length; i++) {
      if (this.users()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 1;
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'danger';
    }
  }

  getStatusTitle(status: boolean) {
    switch (status) {
      case true:
        return 'active';
      case false:
        return 'inactive';
      default:
        return 'inactive';
    }
  }

  saveUser() {
   this.usersService.saveUser(this.userForm.value);
  }


  /*
      private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private String profilePicture;
  */
  initiatForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['12345678', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      role: ['USER', [Validators.required]],
      profilePicture: ['', [Validators.maxLength(255)]],
    });
  }

  setForm(user: User) {
    this.userForm = this.fb.group({
      id: [user.id, [Validators.required]],
      username: [user.username, [Validators.required, Validators.maxLength(50)]],
      email: [user.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(255)]],
      firstName: [user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [user.lastName, [Validators.required, Validators.maxLength(50)]],
      role: [user.attributes?.role ? user.attributes.role[0] : '', [Validators.required]],
      profilePicture: [user.attributes?.profilePicture ? user.attributes.profilePicture[0] : '', [Validators.maxLength(255)]],
    });
  }



}
