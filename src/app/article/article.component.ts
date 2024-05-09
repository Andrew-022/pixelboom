import {Component, untracked} from '@angular/core';
import {Article} from "../model/article";
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute} from "@angular/router";
import {GameNavigatorService} from "../services/game-navigator.service";

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

  constructor(private firebaseRepository: firebaseRepository, private route: ActivatedRoute, private gameNavigator: GameNavigatorService) { }

  ngOnInit(): void {
    this.article = this.gameNavigator.getArticle();

  }


}
