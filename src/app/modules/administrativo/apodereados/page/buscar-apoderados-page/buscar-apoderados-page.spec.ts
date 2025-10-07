import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarApoderadosPageComponent } from './buscar-apoderados-page';

describe('BuscarApoderadosPageComponent', () => {
  let component: BuscarApoderadosPageComponent;
  let fixture: ComponentFixture<BuscarApoderadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarApoderadosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarApoderadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter results based on search term', () => {
    component.searchTerm = 'Juan';
    component.onSearchChange();
    expect(component.searchResults.length).toBeGreaterThan(0);
    expect(component.searchResults[0].nombre).toContain('Juan');
  });

  it('should clear results when search term is empty', () => {
    component.searchTerm = '';
    component.onSearchChange();
    expect(component.searchResults.length).toBe(0);
    expect(component.isSearching).toBeFalse();
  });

  it('should handle backdrop click to close search', () => {
    spyOn(component, 'closeSearch');
    const event = new Event('click');
    Object.defineProperty(event, 'target', { value: event.currentTarget });
    component.onBackdropClick(event);
    expect(component.closeSearch).toHaveBeenCalled();
  });
});
