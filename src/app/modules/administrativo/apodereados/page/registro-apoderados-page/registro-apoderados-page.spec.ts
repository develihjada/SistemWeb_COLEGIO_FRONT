import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroApoderadosPage } from './registro-apoderados-page';

describe('RegistroApoderadosPage', () => {
  let component: RegistroApoderadosPage;
  let fixture: ComponentFixture<RegistroApoderadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroApoderadosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroApoderadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
