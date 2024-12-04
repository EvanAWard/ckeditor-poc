import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ckeditor2Component } from './ckeditor2.component';

describe('Ckeditor2Component', () => {
  let component: Ckeditor2Component;
  let fixture: ComponentFixture<Ckeditor2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ckeditor2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ckeditor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
