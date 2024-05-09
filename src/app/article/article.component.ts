import {Component, untracked} from '@angular/core';
import {Article} from "../model/article";
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  articleId: string = 'H56dZAeY0b88pWvnNKPF';
  article: Article | undefined;
  error=false;
  paragraphs: string[] = [];

  constructor(private firebaseRepository: firebaseRepository, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id !== null) {
        this.articleId = id; //

        if (this.articleId) {
          this.article = await this.firebaseRepository.getArticleById(this.articleId);
          if (!this.article) {
            this.error = true;
          }
        }
      }
    });
  }
}
