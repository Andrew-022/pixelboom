import {Component, Input} from '@angular/core';
import {Review} from "../model/review";

@Component({
  selector: 'app-review-preview',
  standalone: true,
  imports: [],
  templateUrl: './review-preview.component.html',
  styleUrl: './review-preview.component.css'
})
export class ReviewPreviewComponent {

  mockupImage: string = "";

  private _review: Review = {
    userId: "",
    gameId: "",
    rating: "0",
    title: "",
    review: "Error",
  };

  @Input()
  set review(value: Review) {
    if (value) {
      this._review = value;
    }
  }

  get review(): Review {
    return this._review;
  }
}
