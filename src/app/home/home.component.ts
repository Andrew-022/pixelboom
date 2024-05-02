import { Component } from '@angular/core';
import {GameViewComponent} from "../game-view/game-view.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameViewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
