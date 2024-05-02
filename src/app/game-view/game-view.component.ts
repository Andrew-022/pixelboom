import { Component } from '@angular/core';
import {game} from "../model/game"
@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  game: game = {
    id:"1",
    name:"God Of War",
    cover:"https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png",
    score:90,
    nReviews:12,
  }
}
