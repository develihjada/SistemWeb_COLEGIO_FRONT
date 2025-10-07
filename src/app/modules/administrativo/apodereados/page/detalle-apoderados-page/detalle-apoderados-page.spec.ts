import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleApoderadosPage } from './detalle-apoderados-page';

describe('DetalleApoderadosPage', () => {
  let component: DetalleApoderadosPage;
  let fixture: ComponentFixture<DetalleApoderadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleApoderadosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleApoderadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
