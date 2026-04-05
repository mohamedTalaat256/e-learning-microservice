import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly apiUrl = 'http://localhost:8072/eLearning/users/api'; // routed through gateway

  users = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  private http = inject(HttpClient);

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

}
