import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepartamentosPageComponent } from './lista-departamentos-page.component';

describe('ListaDepartamentosPageComponent', () => {
  let component: ListaDepartamentosPageComponent;
  let fixture: ComponentFixture<ListaDepartamentosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDepartamentosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDepartamentosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
