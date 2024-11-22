import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentProgressComponent } from './view-student-progress.component';

describe('ViewStudentProgressComponent', () => {
  let component: ViewStudentProgressComponent;
  let fixture: ComponentFixture<ViewStudentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
