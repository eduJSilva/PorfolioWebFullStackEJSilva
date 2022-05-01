import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeFormComponent } from './acerca-de-form.component';

describe('AcercaDeFormComponent', () => {
  let component: AcercaDeFormComponent;
  let fixture: ComponentFixture<AcercaDeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaDeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaDeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
