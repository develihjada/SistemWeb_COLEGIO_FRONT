import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleadosPageComponent } from './lista-empleados-page.component';

describe('ListaEmpleadosPageComponent', () => {
  let component: ListaEmpleadosPageComponent;
  let fixture: ComponentFixture<ListaEmpleadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpleadosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEmpleadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
