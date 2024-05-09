import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faCartShopping, faMagnifyingGlass, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly faUser = faUser;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faUserPlus = faUserPlus;

  loggedNavbarView: boolean = false

  constructor(private dialogRef: MatDialog, private authService: FirebaseAuthService , private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.loggedNavbarView = !!user;
    });
  }

  openDialog(i: number){
    if(i==0){
      this.dialogRef.open(LoginComponent);
    }
    else{
      this.dialogRef.open(SignUpComponent)
    }
  }

  onLogout() {
    this.authService.logout();
    console.log(this.router.url)
    if(this.router.url != 'home') {
      this.router.navigate(['/home'])
    }
  }

}