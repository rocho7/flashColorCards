import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsTime } from './buttons-time';

describe('ButtonsTime', () => {
  let component: ButtonsTime;
  let fixture: ComponentFixture<ButtonsTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
