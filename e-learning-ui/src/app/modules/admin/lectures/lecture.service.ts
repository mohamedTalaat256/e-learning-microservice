import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormMode } from '../../../core/enum/formModeEnum';
import { Lecture } from '../../../core/model/lecture.model';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LectureSection } from '../../../core/model/lectureSection.model';

@Injectable({ providedIn: 'root' })
export class lectureService {

  private readonly apiUrl = 'http://localhost:8072/eLearning/lectures/api';

  lectures = signal<Lecture[]>([]);
  sections = signal<LectureSection[]>([]);

  loading = signal(false);
  loadingSave = signal(false);
  savedSuccess = signal(false);

  loadingDelete = signal(false);
  lectureDialog = signal(false);
  error = signal<string | null>(null);
  private http = inject(HttpClient);
  private messageService = inject(MessageService);


  loadLectures(courseId: number) {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(`${this.apiUrl}/${courseId}`).subscribe({
      next: (res) => {
        this.lectures.set(res.lectures);
        this.sections.set(res.sections);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

saveLecture(formValue: any ) {
   this.loadingSave.set(true);
    this.lectureDialog.set(false);
    this.error.set(null);

    const payload = {
      ...formValue
    };

    let formMode = FormMode.CREATE;
    if (formValue.id) {
      formMode = FormMode.EDIT
    }

    this.http.post<any>(this.apiUrl, formValue).subscribe({
      next: (res) => {

        if (formMode === FormMode.CREATE) {
          this.lectures.update((lectures) => [...lectures, res]);
        } else {
          this.lectures.update((lectures) =>
            lectures.map(lecture => lecture.id === res.id ? res : lecture)
          );
        }

        this.loadingSave.set(false);
        this.lectureDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: formMode === FormMode.CREATE ? 'Lecture Created' : 'Lecture updated',
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
    this.lectureDialog.set(false);
    this.error.set(null);

    this.http.delete<any>(this.apiUrl + '/' + id).subscribe({
      next: (res) => {
        this.lectures.update((lectures) =>
          lectures.filter(lecture => lecture.id !== id)
        );
        this.loadingDelete.set(false);
        this.lectureDialog.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Lecture Deleted',
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
    this.lectureDialog.set(false);
    this.error.set(null);

    this.http.delete<any>(this.apiUrl, { body: ids }).subscribe({
      next: () => {
        this.lectures.update((lectures) =>
          lectures.filter(lecture => !ids.includes(lecture.id!))
        );
        this.loadingDelete.set(false);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Lectures Deleted',
          life: 3000
        });
      },
      error: () => {
        this.loadingDelete.set(false);
      }
    });
  }

}
