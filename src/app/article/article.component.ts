import {Component, untracked} from '@angular/core';
import {Article} from "../model/article";
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute} from "@angular/router";
import {GameNavigatorService} from "../services/game-navigator.service";
import {Observable} from "rxjs";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    ArticlePreviewComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  articleId: string = 'H56dZAeY0b88pWvnNKPF';
  article: Article | undefined;
  error=false;
  articles: Article[] = [];

  constructor(private firebaseRepository: firebaseRepository, private route: ActivatedRoute, private gameNavigator: GameNavigatorService) { }

  ngOnInit(): void {
    this.article = this.gameNavigator.getArticle();
    this.firebaseRepository.getAllArticles()
      .then((articlesObservable: Observable<Article[]>) => {
        articlesObservable.subscribe((articles: Article[]) => {
          this.articles = articles;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los artículos:", error);
      });
  }
}
