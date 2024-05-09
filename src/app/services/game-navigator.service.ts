import { Injectable } from '@angular/core';
import { game } from '../model/game';
import {Article} from "../model/article";

@Injectable({
  providedIn: 'root'
})
export class GameNavigatorService {
  private game!: game;
  private article!: Article;
  constructor() { }

  setGame(game: any): void {
    this.game = game;
  }

  setArticle(article: Article): void {
    this.article = article;
  }

  getArticle(): Article {
    return this.article;
  }


  getGame(): any {
    return this.game;
  }
}
