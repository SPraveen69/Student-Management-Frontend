import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHubComponent } from './student-hub.component';

describe('StudentHubComponent', () => {
  let component: StudentHubComponent;
  let fixture: ComponentFixture<StudentHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentHubComponent]
    });
    fixture = TestBed.createComponent(StudentHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
