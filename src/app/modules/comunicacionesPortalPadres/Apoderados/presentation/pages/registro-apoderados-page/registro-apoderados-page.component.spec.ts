import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroApoderadosPageComponent } from './registro-apoderados-page.component';

describe('RegistroApoderadosPageComponent', () => {
  let component: RegistroApoderadosPageComponent;
  let fixture: ComponentFixture<RegistroApoderadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroApoderadosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroApoderadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
