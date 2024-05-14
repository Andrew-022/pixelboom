import {Component} from '@angular/core';
import {Article} from "../model/article";
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute} from "@angular/router";
import {GameNavigatorService} from "../services/game-navigator.service";
import {Observable} from "rxjs";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";
import {GameViewComponent} from "../game-view/game-view.component";
import {game} from "../model/game";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    ArticlePreviewComponent,
    GameViewComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  article: Article | undefined;
  error=false;
  articles: Article[] = [];
  game: game | undefined;

  constructor(private firebaseRepository: firebaseRepository, private route: ActivatedRoute, private gameNavigator: GameNavigatorService) { }

  ngOnInit(): void {
    this.article = this.gameNavigator.getArticle();
    this.loadGame();
    this.firebaseRepository.getAllArticles()
      .then((articlesObservable: Observable<Article[]>) => {
        articlesObservable.subscribe((articles: Article[]) => {
          this.articles = articles;
        });
      })
      .catch((error) => {
        console.error("Error retrieving articles:", error);
      });
  }

  private async loadGame(): Promise<void> {
    try {
      if(this.article){
        const game = await this.firebaseRepository.getGameById(this.article.gameId);
        if (game) {
          this.game = game;
        } else {
          console.log("No game found with the provided ID.");
        }
      }
    } catch (error) {
      console.error("Error loading the game:", error);
    }
  }
}
