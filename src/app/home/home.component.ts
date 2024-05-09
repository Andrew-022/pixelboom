import { Component } from '@angular/core';
import {GameViewComponent} from "../game-view/game-view.component";
import {game} from "../model/game";
import { firebaseRepository } from "../services/firebaseRepository";
import {Observable} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameViewComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  games: game[] = [];

  constructor(private firebaseRepository: firebaseRepository) { }
  async ngOnInit(): Promise<void> {
    this.firebaseRepository.getAllGames()
      .then((booksObservable: Observable<game[]>) => {
        booksObservable.subscribe((games: game[]) => {
          this.games = games;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  }

}
