import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaApoderadosPage } from './lista-apoderados-page';

describe('ListaApoderadosPage', () => {
  let component: ListaApoderadosPage;
  let fixture: ComponentFixture<ListaApoderadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaApoderadosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaApoderadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
