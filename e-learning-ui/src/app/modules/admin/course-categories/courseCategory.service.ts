import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseCategory } from '../../../core/model/courseCategory.model';


@Injectable({ providedIn: 'root' })
export class CourseCategoryService {
private readonly apiUrl = 'http://localhost:8072/eLearning/courses/api/categories';

  categories = signal<CourseCategory[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadCategories() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.categories.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load courses');
        this.loading.set(false);
      }
    });
  }
}
