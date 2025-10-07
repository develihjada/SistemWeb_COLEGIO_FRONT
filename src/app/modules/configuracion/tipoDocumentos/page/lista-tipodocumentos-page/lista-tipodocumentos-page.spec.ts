import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipodocumentosPage } from './lista-tipodocumentos-page';

describe('ListaTipodocumentosPage', () => {
  let component: ListaTipodocumentosPage;
  let fixture: ComponentFixture<ListaTipodocumentosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTipodocumentosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTipodocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
