import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/model/user.model';
import { FormMode } from '../../../core/enum/formModeEnum';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly apiUrl = 'http://localhost:8072/eLearning/users/api'; // routed through gateway

  users = signal<any[]>([]);
  loading = signal(false);
  loadingSave = signal(false);
  userDialog = signal(false);
  savedSuccess = signal(false);



  error = signal<string | null>(null);
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.users.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  saveUser(formValue: any) {
    this.loadingSave.set(true);
    this.userDialog.set(false);
    this.error.set(null);


    let formMode = FormMode.CREATE;
    if (formValue.id) {
      formMode = FormMode.EDIT
    }

    this.http.post<any>(this.apiUrl, formValue).subscribe({
      next: (res) => {

        if (formMode === FormMode.CREATE) {
          this.users.update((users) => [...users, res]);
        } else {
          this.users.update((users) =>
            users.map(user => user.id === res.id ? res : user)
          );
        }

        this.loadingSave.set(false);
        this.userDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: formMode === FormMode.CREATE ? 'User Created' : 'User updated',
          life: 3000
        });
        this.savedSuccess.set(true);

      },
      error: () => {
        this.loadingSave.set(false);
         this.userDialog.set(true);
      }
    });
  }


}
