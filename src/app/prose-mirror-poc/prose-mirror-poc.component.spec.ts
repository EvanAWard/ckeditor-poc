import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProseMirrorPOCComponent } from './prose-mirror-poc.component';

describe('ProseMirrorPOCComponent', () => {
  let component: ProseMirrorPOCComponent;
  let fixture: ComponentFixture<ProseMirrorPOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProseMirrorPOCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProseMirrorPOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
