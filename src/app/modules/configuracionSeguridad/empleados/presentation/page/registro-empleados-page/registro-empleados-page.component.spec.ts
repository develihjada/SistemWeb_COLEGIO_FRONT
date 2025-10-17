import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmpleadosPageComponent } from './registro-empleados-page.component';

describe('RegistroEmpleadosPageComponent', () => {
  let component: RegistroEmpleadosPageComponent;
  let fixture: ComponentFixture<RegistroEmpleadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmpleadosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroEmpleadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
