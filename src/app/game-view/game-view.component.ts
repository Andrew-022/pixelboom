import {Component, Input} from '@angular/core';
import {game} from "../model/game"
import {RouterLink} from "@angular/router";
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
}
