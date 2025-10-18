import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEvaluacionesNotasPageComponent } from './registro-evaluaciones-notas-page.component';

describe('RegistroEvaluacionesNotasPageComponent', () => {
  let component: RegistroEvaluacionesNotasPageComponent;
  let fixture: ComponentFixture<RegistroEvaluacionesNotasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEvaluacionesNotasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroEvaluacionesNotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
