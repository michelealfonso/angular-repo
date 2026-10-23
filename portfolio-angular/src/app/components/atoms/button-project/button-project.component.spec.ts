import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonProjectComponent } from './button-project.component';

describe('ButtonProjectComponent', () => {
  let component: ButtonProjectComponent;
  let fixture: ComponentFixture<ButtonProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
