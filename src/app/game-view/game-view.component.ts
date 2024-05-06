import {Component, Input} from '@angular/core';
import {game} from "../model/game"
@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  @Input() game!: game;
}
