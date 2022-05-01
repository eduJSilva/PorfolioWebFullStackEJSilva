import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionExpiredComponent } from './sesion-expired.component';

describe('SesionExpiredComponent', () => {
  let component: SesionExpiredComponent;
  let fixture: ComponentFixture<SesionExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
