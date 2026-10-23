import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBooksComponent } from './collection-books.component';

describe('CollectionBooksComponent', () => {
  let component: CollectionBooksComponent;
  let fixture: ComponentFixture<CollectionBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
