import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from "./navbar/navbar.component";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {ArticleComponent} from "./article/article.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    NavbarComponent,
    ArticleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pixelboom';
  authService = inject(FirebaseAuthService)
  ngOnInit(): void{
    this.authService.user$.subscribe((user) =>{
      if(user){
        // @ts-ignore
        this.authService.currentUserSig.set({
          email: user.email!,
          name: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig());
    });
  }
}
