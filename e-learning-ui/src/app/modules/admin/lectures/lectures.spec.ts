import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lectures } from './lectures';

describe('Lectures', () => {
  let component: Lectures;
  let fixture: ComponentFixture<Lectures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lectures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lectures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
