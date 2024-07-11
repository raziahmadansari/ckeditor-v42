import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultirootEditorComponent } from './multiroot-editor.component';

describe('MultirootEditorComponent', () => {
  let component: MultirootEditorComponent;
  let fixture: ComponentFixture<MultirootEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultirootEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultirootEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
