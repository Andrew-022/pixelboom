import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../model/review";
import {User} from "../model/user";
import {firebaseRepository} from "../services/firebaseRepository";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-review-preview',
  standalone: true,
  imports: [],
  templateUrl: './review-preview.component.html',
  styleUrl: './review-preview.component.css'
})
export class ReviewPreviewComponent implements OnInit{

  mockupImage: string = "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
  user: User | null = null;

  private _review: Review = {
    userId: "",
    gameId: "",
    rating: 0,
    title: "",
    review: "Error",
  };

  constructor(public firebaseRepository: firebaseRepository) { }
  async ngOnInit() {
    try {
      console.log("User id = ", this._review.userId);
      this.firebaseRepository.getUserDataById(this._review.userId).then(
        (user => {
          this.user = user as User;
        })
      )
    } catch (error) {
      console.error("No se ha podido encontrar el nombre de usuario.");
    }
  }

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
