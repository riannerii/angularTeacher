import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRosterlistComponent } from './view-rosterlist.component';

describe('ViewRosterlistComponent', () => {
  let component: ViewRosterlistComponent;
  let fixture: ComponentFixture<ViewRosterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRosterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRosterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
