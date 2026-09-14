import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsTimeComponent } from './buttons-time';

describe('ButtonsTimeComponent', () => {
  let component: ButtonsTimeComponent;
  let fixture: ComponentFixture<ButtonsTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
