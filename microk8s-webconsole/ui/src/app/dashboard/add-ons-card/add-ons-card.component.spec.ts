import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsCardComponent } from './add-ons-card.component';

describe('AddonsCardComponent', () => {
  let component: AddOnsCardComponent;
  let fixture: ComponentFixture<AddOnsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
