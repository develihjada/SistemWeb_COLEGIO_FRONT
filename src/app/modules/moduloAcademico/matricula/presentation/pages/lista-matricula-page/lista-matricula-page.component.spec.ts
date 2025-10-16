import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMatriculaPageComponent } from './lista-matricula-page.component';

describe('ListaMatriculaPageComponent', () => {
  let component: ListaMatriculaPageComponent;
  let fixture: ComponentFixture<ListaMatriculaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMatriculaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMatriculaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
