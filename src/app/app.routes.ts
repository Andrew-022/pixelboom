import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";
import {ArticleComponent} from "./article/article.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'game/:name', component: GameComponent},
  { path: 'article/:id', component: ArticleComponent },
  { path: '**', redirectTo: 'home' },
];
