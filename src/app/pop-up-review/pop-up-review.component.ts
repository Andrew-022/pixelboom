import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Review} from "../model/review";
import { firebaseRepository } from "../services/firebaseRepository";
@Component({
  selector: 'app-pop-up-review',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './pop-up-review.component.html',
  styleUrl: './pop-up-review.component.css'
})
export class PopUpReviewComponent {
  sliderValue: number = 66;

  review: Review = {
    gameId: this.data.id,
    rating: 0,
    review: '',
    title: '',
    userId: ''
  };

  constructor(private firebaseRepository: firebaseRepository  ,@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PopUpReviewComponent> ) { }


  async submitreview(){
    this.review.rating=this.sliderValue;
    await this.firebaseRepository.addReview(this.review);
    this.dialogRef.close();
  }
}
