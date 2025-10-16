import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMatriculaPageComponent } from './registro-matricula-page.component';

describe('RegistroMatriculaPageComponent', () => {
  let component: RegistroMatriculaPageComponent;
  let fixture: ComponentFixture<RegistroMatriculaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMatriculaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroMatriculaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
