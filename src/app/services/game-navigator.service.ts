import { Injectable } from '@angular/core';
import { game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameNavigatorService {
  private game!: game;

  constructor() { }

  setGame(game: any): void {
    this.game = game;
  }

  getGame(): any {
    return this.game;
  }
}
