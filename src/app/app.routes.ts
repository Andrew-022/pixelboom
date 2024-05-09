import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";
import {ArticleComponent} from "./article/article.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'game/:name', component: GameComponent},
  { path: 'article/:id', component: ArticleComponent },
  { path: '**', redirectTo: 'home' },
];
