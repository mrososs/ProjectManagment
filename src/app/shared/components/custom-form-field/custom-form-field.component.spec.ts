import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormFieldComponent } from './custom-form-field.component';

describe('CustomFormFieldComponent', () => {
  let component: CustomFormFieldComponent;
  let fixture: ComponentFixture<CustomFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
