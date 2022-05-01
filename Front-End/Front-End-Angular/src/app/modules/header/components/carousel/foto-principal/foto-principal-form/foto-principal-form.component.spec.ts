import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPrincipalFormComponent } from './foto-principal-form.component';

describe('FotoPrincipalFormComponent', () => {
  let component: FotoPrincipalFormComponent;
  let fixture: ComponentFixture<FotoPrincipalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoPrincipalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoPrincipalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
