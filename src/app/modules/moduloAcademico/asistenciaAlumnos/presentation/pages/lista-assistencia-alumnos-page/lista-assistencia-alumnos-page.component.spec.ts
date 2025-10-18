import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAssistenciaAlumnosPageComponent } from './lista-assistencia-alumnos-page.component';

describe('ListaAssistenciaAlumnosPageComponent', () => {
  let component: ListaAssistenciaAlumnosPageComponent;
  let fixture: ComponentFixture<ListaAssistenciaAlumnosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAssistenciaAlumnosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAssistenciaAlumnosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
