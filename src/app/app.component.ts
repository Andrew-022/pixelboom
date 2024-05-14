import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from "./navbar/navbar.component";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {ArticleComponent} from "./article/article.component";
import {User} from "./model/user";
import {firebaseRepository} from "./services/firebaseRepository";

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
  user: User | null = null;
  title = 'pixelboom';
  authService = inject(FirebaseAuthService)

  constructor(private firebaseRepository: firebaseRepository) {
  }

  ngOnInit(): void{
    this.authService.user$.subscribe((user) =>{
      if(user){
        // @ts-ignore
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.getUserData();
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig());
    });
  }

  async getUserData(){
    await this.firebaseRepository.getUserData().then(
      (user => {
        if(user) {
          this.user= user as User;
        }
      })
    );
  }

}
