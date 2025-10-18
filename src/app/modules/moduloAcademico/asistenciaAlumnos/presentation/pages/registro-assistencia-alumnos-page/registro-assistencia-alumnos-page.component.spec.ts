import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAssistenciaAlumnosPageComponent } from './registro-assistencia-alumnos-page.component';

describe('RegistroAssistenciaAlumnosPageComponent', () => {
  let component: RegistroAssistenciaAlumnosPageComponent;
  let fixture: ComponentFixture<RegistroAssistenciaAlumnosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAssistenciaAlumnosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroAssistenciaAlumnosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
