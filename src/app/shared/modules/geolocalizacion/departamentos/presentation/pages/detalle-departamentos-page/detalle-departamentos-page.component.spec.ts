import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDepartamentosPageComponent } from './detalle-departamentos-page.component';

describe('DetalleDepartamentosPageComponent', () => {
  let component: DetalleDepartamentosPageComponent;
  let fixture: ComponentFixture<DetalleDepartamentosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDepartamentosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDepartamentosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
