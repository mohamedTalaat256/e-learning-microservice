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
import { CourseCategory } from '../../../core/model/courseCategory.model';
import { FormInput } from '../../../shared/components/form-input/form-input';
import { CourseCategoryService } from './courseCategory.service';
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
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, RippleModule, ToastModule,
    ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule,
    RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule,
    IconFieldModule, ConfirmDialogModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    FormInput, ReactiveFormsModule],
  templateUrl: './course-categories.html',
  styleUrl: './course-categories.scss',
  providers: [MessageService, ConfirmationService, CourseCategoryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCategories implements OnInit {
  categoryDialog: boolean = false;

  category!: CourseCategory;
  selectedCategories!: CourseCategory[] | null;
  submitted: boolean = false;
  statusOptions!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

  categoryForm!: FormGroup;

  private categoriesService = inject(CourseCategoryService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  categories = this.categoriesService.categories;
  loading = this.categoriesService.loading;
  error = this.categoriesService.error;

  ngOnInit(): void {
    this.categoriesService.loadCategories();
    this.initiatForm();
  }


  exportCSV() {
    this.dt.exportCSV();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCourse(category: CourseCategory) {
    this.category = { ...category };
    this.setForm(this.category);
    this.categoryDialog = true;
  }

  deleteSelectedCourses() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categories?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories.set(this.categories().filter((val) => !this.selectedCategories?.includes(val)));
        this.selectedCategories = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Courses Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  deleteCourse(category: CourseCategory) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories.set(this.categories().filter((val) => val.id !== category.id));
        this.category = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Deleted',
          life: 3000
        });
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.categories().length; i++) {
      if (this.categories()[i].id === id) {
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
    this.submitted = true;
    let _categories = this.categories();

    console.log(this.categoryForm.value);

    if (this.category.title?.trim()) {
      if (this.category.id) {
        _categories[this.findIndexById(this.category.id)] = this.category;
        this.categories.set([..._categories]);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Updated',
          life: 3000
        });
      } else {
        this.category.id = this.createId();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Created',
          life: 3000
        });
        this.categories.set([..._categories, this.category]);
      }

      this.categoryDialog = false;
      this.category = {};
    }
  }


  initiatForm() {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],

    });
  }
  setForm(category: CourseCategory) {
    this.categoryForm = this.fb.group({
      id: [category.id, [Validators.required]],
      title: [category.title, [Validators.required, Validators.maxLength(50)]],
      description: [category.description, [Validators.required, Validators.maxLength(255)]],
    });
  }

}
