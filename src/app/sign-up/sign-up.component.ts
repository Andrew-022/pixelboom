import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  message: string |null = null;

  constructor(private fb: FormBuilder,
              private authService: FirebaseAuthService,
              private dialogRef: MatDialogRef<SignUpComponent>) {
  }
  registerForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellidos: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]]
  })

  submit(){
    const rawForm = this.registerForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.nombre, rawForm.apellidos, rawForm.password)
      .subscribe({
        next: () =>{
          this.dialogRef.close();
        },
        error: (error) => {
          this.message = error.code;
        }
      });
  }

}
