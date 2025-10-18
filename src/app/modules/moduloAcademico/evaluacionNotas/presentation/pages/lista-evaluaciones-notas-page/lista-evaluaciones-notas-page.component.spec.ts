import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEvaluacionesNotasPageComponent } from './lista-evaluaciones-notas-page.component';

describe('ListaEvaluacionesNotasPageComponent', () => {
  let component: ListaEvaluacionesNotasPageComponent;
  let fixture: ComponentFixture<ListaEvaluacionesNotasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEvaluacionesNotasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEvaluacionesNotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
