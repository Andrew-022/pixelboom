import {Component, Input, OnInit} from '@angular/core';
import { game } from '../model/game';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {GameNavigatorService} from "../services/game-navigator.service";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";
import {Article} from "../model/article";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FaIconComponent,
    ArticlePreviewComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faMessage = faMessage;

  game!: game | undefined;
  gameArticles: Article[] = [];
  constructor(private gameNavigator: GameNavigatorService ,private firebaseRepository: firebaseRepository, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.game = this.gameNavigator.getGame();

    if(this.game?.articles) {
      for(let art of this.game?.articles) {
        await this.firebaseRepository.getArticleById(art).then(
          (article => {
            if(article) {
              this.gameArticles.push(article as Article);
            }
          })
        );
      }
    }
  }
}
