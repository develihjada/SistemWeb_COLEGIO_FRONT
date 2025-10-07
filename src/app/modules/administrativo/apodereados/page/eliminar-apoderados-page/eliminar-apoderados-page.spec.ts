import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarApoderadosPage } from './eliminar-apoderados-page';

describe('EliminarApoderadosPage', () => {
  let component: EliminarApoderadosPage;
  let fixture: ComponentFixture<EliminarApoderadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarApoderadosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarApoderadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
