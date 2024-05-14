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

  article1: Article = {
    id: "1",
    title: "Una cosa es una cosa, y otra cosa es otra cosa",
    imageUrl: "https://assets-prd.ignimgs.com/2024/02/09/helldivers2-blogroll-1707522009783.jpg",
    author: "Cervantes",
    paragraphs: ["This is a test article 1."],
    date: "error",
    smallPreview: "https://sm.ign.com/t/ign_es/cover/h/helldivers/helldivers-ii_7br6.128.jpg"
  };
  article2: Article = {
    id: "2",
    title: "Son dos cosas totalmente diferentes, evidentemente",
    imageUrl: "https://assets-prd.ignimgs.com/2024/02/09/helldivers2-blogroll-1707522009783.jpg",
    author: "Cervantes de nuevo",
    paragraphs: ["This is a test article 2."],
    date: "error",
    smallPreview: "https://assets-prd.ignimgs.com/2024/02/09/helldivers2-blogroll-1707522009783.jpg"
  };

  articles: Article[] = [this.article1, this.article2];

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
