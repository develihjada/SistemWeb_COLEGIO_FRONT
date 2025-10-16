import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDepartamentoComponent } from './header-departamento.component';

describe('HeaderDepartamentoComponent', () => {
  let component: HeaderDepartamentoComponent;
  let fixture: ComponentFixture<HeaderDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
