import { Component } from '@angular/core';
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {firebaseRepository} from "../services/firebaseRepository";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';
  isEditingNombre: boolean = false;
  profilemessage: string | null = null;
  private profilePicture?: File;

  constructor(private authService: FirebaseAuthService,
              private route: ActivatedRoute,
              private firebaseRepository: firebaseRepository) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.getUserData();
    });
  }


  async getUserData(){
    await this.firebaseRepository.getUserData().then(
      (user => {
        if(user) {
          this.user= user as User;
          this.urlImagenPerfil=this.user.profilePictureURL;
        }
      })
    );
  }
  toggleEditNombre() {
    this.isEditingNombre = !this.isEditingNombre;
  }

  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10485760) {
        alert('El archivo debe ser menor a 10 MB.');
        return;
      }
      this.profilePicture = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target) {
          this.urlImagenPerfil = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitUserData() {
    if(this.user){
      if(this.profilePicture != null) {
        this.authService.uploadProfilePicture(<File> this.profilePicture,this.user.username).then(
          (response) => {
            if(response) {
              console.log("La imagen se ha cargado.");
              this.profilemessage="Cambios realizados con éxito";
            } else {
              console.log("Ha habido un error al cargar la imagen.");
            }
            window.location.reload();
          }
        );
      }
      else{
        this.authService.updateData(this.user.username).then(
          () => {
            this.profilemessage="Cambios realizados con éxito";
            window.location.reload();
          }
        );
      }
    }
  }

}
