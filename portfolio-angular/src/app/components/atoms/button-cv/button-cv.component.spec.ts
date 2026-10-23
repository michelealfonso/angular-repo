import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCvComponent } from './button-cv.component';

describe('ButtonCvComponent', () => {
  let component: ButtonCvComponent;
  let fixture: ComponentFixture<ButtonCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
