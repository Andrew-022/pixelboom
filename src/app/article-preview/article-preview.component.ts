import { Component, Input } from '@angular/core';
import {Article} from '../model/article';
import {Router} from "@angular/router";
import {GameNavigatorService} from "../services/game-navigator.service";

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent {
  constructor(private router: Router, private gameNavigator: GameNavigatorService) { }
  private _article: Article = {
    id: "error",
    title: "Fallo al recibir la information",
    imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_nQDRMfNCBCUumCBMlgwAwrVCNYZPmI6wnUME9B5EmxYNY=s900-c-k-c0x00ffffff-no-rj",
    author: "Error",
    date: "error",
    paragraphs: [],
    smallPreview: "https://learn.microsoft.com/es-es/windows/win32/uxguide/images/mess-error-image15.png",
    gameId: ""
  };

  @Input()
  set article(value: Article) {
    if (value) {
      this._article = value;
    }
  }
  onClick() {
    this.gameNavigator.setArticle(this._article);
    this.router.navigate(['/article/', this._article.id]);
  }
  get article(): Article {
    return this._article;
  }
}
