import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTipodocumentosPage } from './detalle-tipodocumentos-page';

describe('DetalleTipodocumentosPage', () => {
  let component: DetalleTipodocumentosPage;
  let fixture: ComponentFixture<DetalleTipodocumentosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTipodocumentosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTipodocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
