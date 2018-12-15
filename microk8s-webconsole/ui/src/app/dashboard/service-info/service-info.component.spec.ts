import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInfoComponent } from './service-info.component';

describe('ServiceInfoComponent', () => {
  let component: ServiceInfoComponent;
  let fixture: ComponentFixture<ServiceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
