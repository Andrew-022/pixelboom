import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
  selectedStars  = 0;
  sliderValue: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  rate(star: number){
    this.selectedStars =star;
  }
}
