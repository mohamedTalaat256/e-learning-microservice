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
import { FormInput } from "../../../shared/components/form-input/form-input";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { lectureService } from './lecture.service';
import { Lecture } from '../../../core/model/lecture.model';
import { BehaviorSubject } from 'rxjs';
import {ObjectUtils} from "primeng/utils";

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
  selector: 'app-lectures',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, RippleModule, ToastModule,
    ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule,
    RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule,
    IconFieldModule, ConfirmDialogModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    FormInput, ReactiveFormsModule],
  templateUrl: './lectures.html',
  styleUrl: './lectures.scss',
  providers: [MessageService, ConfirmationService, lectureService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lectures implements OnInit {

  courseId!: number;
  selectedLectures: Lecture[] = [];
  statusOptions!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

  videoFile: File | null = null;
  uploadProgress = 0;

  lectureForm!: FormGroup;

  isExpanded: boolean = false;
  expandedRows: expandedRows = {};

  private lectureService = inject(lectureService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  lectures = this.lectureService.lectures;
  sections = this.lectureService.sections;

  loading = this.lectureService.loading;

  loadingSave = this.lectureService.loadingSave;
  lectureDialog = this.lectureService.lectureDialog;
  error = this.lectureService.error;


    sectionsOptions = computed(() =>
    this.lectureService.sections().map(c => ({
      label: c.title,
      value: c.id
    }))
  );


  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];

    this.lectureService.loadLectures(this.courseId);

  }


  exportCSV() {
    this.dt.exportCSV();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.initiatForm();
    this.lectureDialog.set(true);
  }

  editLecture(lecture: Lecture) {
    this.setForm(lecture);
    this.lectureDialog.set(true);
  }

  deleteSelectedLectures() {
    if (!this.selectedLectures || this.selectedLectures.length === 0) return;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected lectures?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids: number[] = this.selectedLectures?.map(lecture => lecture.id).filter((id): id is number => id !== undefined);
        this.lectureService.deleteCourses(ids);
      }
    });
  }

  hideDialog() {
    this.initiatForm();
    this.lectureDialog.set(false);
  }

  deleteLecture(lecture: Lecture) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + lecture.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lectureService.deleteCourse(lecture.id!);
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.lectures().length; i++) {
      if (this.lectures()[i].id === id) {
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



  saveLecture() {
    this.lectureService.saveLecture(this.lectureForm.value);
  }

  initiatForm() {
    this.lectureForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      order: [null, [Validators.required, Validators.max(1000)]],
      url: ['', [Validators.required, Validators.max(1000)]],
      courseId: [this.courseId, [Validators.required]],
      sectionId: [null, [Validators.required]]

    });
  }

  setForm(lecture: Lecture) {
    this.lectureForm = this.fb.group({
      id: [lecture.id, [Validators.required]],
      title: [lecture.title, [Validators.required, Validators.maxLength(50)]],
      description: [lecture.description, [Validators.required, Validators.maxLength(255)]],
      order: [lecture.order, [Validators.required, Validators.max(1000)]],
      url: [lecture.url, [Validators.required, Validators.max(1000)]],
      sectionId: [lecture.sectionId, [Validators.required]],


    });
  }




  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
      this.videoFile = file;
    } else {
      this.videoFile = null;
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid file',
        detail: 'Only MP4 videos are allowed.',
        life: 3000
      });
    }
  }


      expandAll() {
        if(ObjectUtils.isEmpty(this.expandedRows)) {
            this.expandedRows = this.lectures().reduce(
                (acc, p) => {
                    if (p.id) {
                        acc[p.id] = true;
                    }
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            this.isExpanded = true;
        } else {
            this.collapseAll()
        }

    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }




}
interface expandedRows {
    [key: string]: boolean;
}
