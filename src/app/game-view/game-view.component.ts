import {Component, Input} from '@angular/core';
import {game} from "../model/game"
import {Router, RouterLink} from "@angular/router";
import {GameNavigatorService} from "../services/game-navigator.service";
@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  @Input() game!: game;

  constructor(private router: Router, private gameNavigator: GameNavigatorService) { }
  onClick() {
    this.gameNavigator.setGame(this.game);
    this.router.navigate(['/game/', this.game.name]);
  }
}
