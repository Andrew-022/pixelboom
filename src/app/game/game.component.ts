import {Component, Input, OnInit} from '@angular/core';
import { game } from '../model/game';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {GameNavigatorService} from "../services/game-navigator.service";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";
import {Article} from "../model/article";
import {ReviewPreviewComponent} from "../review-preview/review-preview.component";
import {Review} from "../model/review";
import {MatDialog} from "@angular/material/dialog";
import {PopUpReviewComponent} from "../pop-up-review/pop-up-review.component";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {LoginComponent} from "../login/login.component";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FaIconComponent,
    ArticlePreviewComponent,
    RouterLink,
    ReviewPreviewComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faMessage = faMessage;

  islogged: boolean = false

  game!: game | undefined;
  gameArticles: Article[] = [];
  gameReviews: Review[] = [];
  constructor(private gameNavigator: GameNavigatorService ,private firebaseRepository: firebaseRepository, private route: ActivatedRoute, private dialogRef: MatDialog, private authService: FirebaseAuthService ) { }

  async ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.islogged = !!user;
    });

    this.game = this.gameNavigator.getGame();

    if(this.game?.articles) {
      for(let art of this.game.articles) {
        await this.firebaseRepository.getArticleById(art).then(
          (article => {
            if(article) {
              this.gameArticles.push(article as Article);
            }
          })
        );
      }
    }

    if(this.game?.reviews) {
      for(let rev of this.game.reviews) {
        await this.firebaseRepository.getReviewById(rev).then(
          (review => {
            if(review) {
              this.gameReviews.push(review as Review);
            }
            console.log(review)
          })
        );
      }

    }
  }

  openDialog(i: number){
    if(i==0){
      this.dialogRef.open(LoginComponent);
    }
    else{
      this.dialogRef.open(PopUpReviewComponent, {
        data: this.game
      });
    }
  }
}
