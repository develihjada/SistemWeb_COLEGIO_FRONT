import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosPageComponent } from './lista-usuarios-page.component';

describe('ListaUsuariosPageComponent', () => {
  let component: ListaUsuariosPageComponent;
  let fixture: ComponentFixture<ListaUsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuariosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaUsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
