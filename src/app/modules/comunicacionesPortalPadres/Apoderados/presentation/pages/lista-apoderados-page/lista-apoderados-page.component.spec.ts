import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaApoderadosPageComponent } from './lista-apoderados-page.component';

describe('ListaApoderadosPageComponent', () => {
  let component: ListaApoderadosPageComponent;
  let fixture: ComponentFixture<ListaApoderadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaApoderadosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaApoderadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
