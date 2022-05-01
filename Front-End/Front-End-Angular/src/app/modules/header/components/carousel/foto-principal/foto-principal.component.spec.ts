import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPrincipalComponent } from './foto-principal.component';

describe('FotoPrincipalComponent', () => {
  let component: FotoPrincipalComponent;
  let fixture: ComponentFixture<FotoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
