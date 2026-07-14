import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStudy } from './header-study';

describe('HeaderStudy', () => {
  let component: HeaderStudy;
  let fixture: ComponentFixture<HeaderStudy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStudy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStudy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
