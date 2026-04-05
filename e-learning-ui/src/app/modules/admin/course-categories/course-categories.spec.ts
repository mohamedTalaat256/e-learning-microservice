import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategories } from './course-categories';

describe('CourseCategories', () => {
  let component: CourseCategories;
  let fixture: ComponentFixture<CourseCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
