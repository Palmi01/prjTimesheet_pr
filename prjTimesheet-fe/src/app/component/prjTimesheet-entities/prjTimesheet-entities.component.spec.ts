import { ComponentFixture, TestBed } from '@angular/core/testing';

import { prjTimesheetEntitiesComponent } from './prjTimesheet-entities.component';

describe('prjTimesheetEntitiesComponent', () => {
  let component: prjTimesheetEntitiesComponent;
  let fixture: ComponentFixture<prjTimesheetEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [prjTimesheetEntitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(prjTimesheetEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
