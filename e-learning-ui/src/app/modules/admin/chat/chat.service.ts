import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/model/user.model';
import { FormMode } from '../../../core/enum/formModeEnum';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private readonly apiUrl = 'http://localhost:8072/eLearning/messages/api'; // routed through gateway

  messages = signal<any[]>([]);
  loading = signal(false);
  loadingSave = signal(false);
  userDialog = signal(false);
  savedSuccess = signal(false);



  error = signal<string | null>(null);
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  loadMessages(otherUserId: string) {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any[]>(`${this.apiUrl}/findMessagesBetweenAuthUserAndOtherUser/${otherUserId}`).subscribe({
      next: (res) => {
        this.messages.set(res);
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
          this.messages.update((messages) => [...messages, res]);
        } else {
          this.messages.update((messages) =>
            messages.map(message => message.id === res.id ? res : message)
          );
        }

        this.loadingSave.set(false);
        this.userDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: formMode === FormMode.CREATE ? 'Message Created' : 'Message updated',
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
