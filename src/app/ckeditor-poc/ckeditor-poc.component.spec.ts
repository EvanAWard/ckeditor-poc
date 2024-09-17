import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CKEditorPOCComponent } from './ckeditor-poc.component';

describe('CKEditorPOCComponent', () => {
  let component: CKEditorPOCComponent;
  let fixture: ComponentFixture<CKEditorPOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CKEditorPOCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CKEditorPOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
