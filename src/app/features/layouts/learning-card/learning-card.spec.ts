import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCard } from './learning-card';

describe('LearningCard', () => {
  let component: LearningCard;
  let fixture: ComponentFixture<LearningCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
