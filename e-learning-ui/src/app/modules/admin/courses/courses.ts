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
import { Tooltip } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Course } from '../../../core/model/course.model';
import { CourseService } from './course.service';
import { FormInput } from "../../../shared/components/form-input/form-input";
import { RouterLink } from "@angular/router";

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
  selector: 'app-courses',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, RippleModule, ToastModule,
    ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule,
    RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule,
    IconFieldModule, ConfirmDialogModule, Tooltip,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    FormInput, ReactiveFormsModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
  providers: [MessageService, ConfirmationService, CourseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Courses implements OnInit {

  selectedCourses: Course[] = [];
  statusOptions!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

  courseForm!: FormGroup;

  private coursesService = inject(CourseService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  courses = this.coursesService.courses;
  categories = this.coursesService.categories;
  loading = this.coursesService.loading;

  loadingSave = this.coursesService.loadingSave;
  courseDialog = this.coursesService.courseDialog;
  error = this.coursesService.error;

  categoryOptions = computed(() =>
    this.coursesService.categories().map(c => ({
      label: c.title,
      value: c.id
    }))
  );

  ngOnInit(): void {
    this.coursesService.loadCourses();
    this.statusOptions = [
      { label: 'ACTIVE', value: true },
      { label: 'INACTIVE', value: false },
    ];
  }


  exportCSV() {
    this.dt.exportCSV();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.initiatForm();
    this.courseDialog.set(true);
  }

  editCourse(course: Course) {
    this.setForm(course);
    this.courseDialog.set(true);
  }

  deleteSelectedCourses() {
    if (!this.selectedCourses || this.selectedCourses.length === 0) return;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected courses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids: number[] = this.selectedCourses?.map(course => course.id).filter((id): id is number => id !== undefined);
        this.coursesService.deleteCourses(ids);
      }
    });
  }

  hideDialog() {
    this.initiatForm();
    this.courseDialog.set(false);
  }

  deleteCourse(course: Course) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coursesService.deleteCourse(course.id!);
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.courses().length; i++) {
      if (this.courses()[i].id === id) {
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

  saveCourse() {
    this.coursesService.saveCourse(this.courseForm.value);
  }

  initiatForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.max(1000)]],
      discountPercentage: ['', [Validators.required, Validators.max(100)]],
      isActive: [null, [Validators.required]],
      category: [null, [Validators.required]],
      thumbnail: [null, [Validators.required]],
      instructor: [null, [Validators.required]],

    });
  }

  setForm(course: Course) {
    this.courseForm = this.fb.group({
      id: [course.id, [Validators.required]],
      title: [course.title, [Validators.required, Validators.maxLength(50)]],
      description: [course.description, [Validators.required, Validators.maxLength(255)]],
      price: [course.price, [Validators.required, Validators.max(1000)]],
      discountPercentage: [course.discountPercentage, [Validators.required, Validators.max(100)]],
      isActive: [course.isActive, [Validators.required]],
      category: [course.category.id, [Validators.required]],
      thumbnail: [course.thumbnail, [Validators.required]],
      instructor: [course.instructor.id, [Validators.required]],
    });
  }

}
