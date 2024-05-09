import { Component, Input } from '@angular/core';
import { article } from '../model/article';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent {
  private _article: article = {
    id: "error",
    name: "Fallo al recibir la información",
    cover: "https://learn.microsoft.com/es-es/windows/win32/uxguide/images/mess-error-image15.png",
    autor: "Error",
    text: "Error al recibir información",
    smallPreview: "https://learn.microsoft.com/es-es/windows/win32/uxguide/images/mess-error-image15.png"
  };

  @Input()
  set article(value: article) {
    if (value) {
      this._article = value;
    }
  }

  get article(): article {
    return this._article;
  }
}
