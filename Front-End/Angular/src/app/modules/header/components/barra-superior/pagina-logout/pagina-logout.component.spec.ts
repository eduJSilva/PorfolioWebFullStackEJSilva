import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLogoutComponent } from './pagina-logout.component';

describe('PaginaLogoutComponent', () => {
  let component: PaginaLogoutComponent;
  let fixture: ComponentFixture<PaginaLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
