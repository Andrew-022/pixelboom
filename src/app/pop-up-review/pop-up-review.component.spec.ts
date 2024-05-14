import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpReviewComponent } from './pop-up-review.component';

describe('PopUpReviewComponent', () => {
  let component: PopUpReviewComponent;
  let fixture: ComponentFixture<PopUpReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
