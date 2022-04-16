import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroconfirmadoComponent } from './registroconfirmado.component';

describe('RegistroconfirmadoComponent', () => {
  let component: RegistroconfirmadoComponent;
  let fixture: ComponentFixture<RegistroconfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroconfirmadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroconfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
