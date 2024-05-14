import { Component } from '@angular/core';
import {GameViewComponent} from "../game-view/game-view.component";
import {game} from "../model/game";
import { firebaseRepository } from "../services/firebaseRepository";
import {Observable} from "rxjs";
import {RouterLink} from "@angular/router";
import {Article} from "../model/article";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameViewComponent,
    RouterLink,
    GameViewComponent,
    ArticlePreviewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  games: game[] = [];



  articles: Article[] = []

  constructor(private firebaseRepository: firebaseRepository) { }
  async ngOnInit(): Promise<void> {
    this.firebaseRepository.getAllGames()
      .then((booksObservable: Observable<game[]>) => {
        booksObservable.subscribe((games: game[]) => {
          this.games = games;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });

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
