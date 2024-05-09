import {Component, Input, OnInit} from '@angular/core';
import { game } from '../model/game';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import {firebaseRepository} from "../services/firebaseRepository";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {GameNavigatorService} from "../services/game-navigator.service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faMessage = faMessage;

  constructor(private gameNavigator: GameNavigatorService ,private firebaseRepository: firebaseRepository, private route: ActivatedRoute) { }
  game: game | undefined;

  ngOnInit() {
    this.game = this.gameNavigator.getGame();
  }
}
