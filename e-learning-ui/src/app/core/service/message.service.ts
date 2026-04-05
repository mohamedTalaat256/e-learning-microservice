import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course.model';
import { CourseCategory } from '../model/courseCategory.model';
import { MessageService } from 'primeng/api';
import { FormMode } from '../enum/formModeEnum';

@Injectable({ providedIn: 'root' })
export class MessagesService {

  private readonly apiUrl = 'http://localhost:8072/eLearning/courses/api';

  courses = signal<Course[]>([]);
  categories = signal<CourseCategory[]>([]);
  loading = signal(false);
  loadingSave = signal(false);
  savedSuccess = signal(false);

  loadingDelete = signal(false);
  courseDialog = signal(false);
  error = signal<string | null>(null);
  private http = inject(HttpClient);
  private messageService = inject(MessageService);


  loadCourses() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.courses.set(res.courses);
        this.categories.set(res.categories);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  saveCourse(formValue: any) {
    this.loadingSave.set(true);
    this.courseDialog.set(false);
    this.error.set(null);

    const payload = {
      ...formValue,
      category: { id: formValue.category },
      instructor: { id: formValue.instructor }
    };

    let formMode = FormMode.CREATE;
    if (formValue.id) {
      formMode = FormMode.EDIT
    }

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (res) => {

        if (formMode === FormMode.CREATE) {
          this.courses.update((courses) => [...courses, res]);
        } else {
          this.courses.update((courses) =>
            courses.map(course => course.id === res.id ? res : course)
          );
        }

        this.loadingSave.set(false);
        this.courseDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: formMode === FormMode.CREATE ? 'Course Created' : 'Course updated',
          life: 3000
        });
        this.savedSuccess.set(true);

      },
      error: () => {
        this.loadingSave.set(false);
      }
    });
  }

  deleteCourse(id: number) {
    this.loadingDelete.set(true);
    this.courseDialog.set(false);
    this.error.set(null);

    this.http.delete<any>(this.apiUrl + '/' + id).subscribe({
      next: (res) => {
        this.courses.update((courses) =>
          courses.filter(course => course.id !== id)
        );
        this.loadingDelete.set(false);
        this.courseDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Deleted',
          life: 3000
        });
      },
      error: () => {
        this.loadingDelete.set(false);
      }
    });
  }



  deleteCourses(ids: number[]) {
    this.loadingDelete.set(true);
    this.courseDialog.set(false);
    this.error.set(null);

    this.http.delete<any>(this.apiUrl, { body: ids }).subscribe({
      next: () => {
        this.courses.update((courses) =>
          courses.filter(course => !ids.includes(course.id!))
        );
        this.loadingDelete.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Courses Deleted',
          life: 3000
        });
      },
      error: () => {
        this.loadingDelete.set(false);
      }
    });
  }

}
