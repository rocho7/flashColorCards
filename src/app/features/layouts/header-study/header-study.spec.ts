import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStudyComponent } from './header-study';

describe('HeaderStudyComponent', () => {
  let component: HeaderStudyComponent;
  let fixture: ComponentFixture<HeaderStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStudyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
