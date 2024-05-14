import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut, updateProfile,
  user, updatePassword, reauthenticateWithCredential,
  EmailAuthProvider, updateEmail, sendEmailVerification
} from "@angular/fire/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from '@angular/fire/storage';
import {from, Observable} from "rxjs";
import {User} from "../model/user";
import {doc, DocumentSnapshot, Firestore, getDoc, getFirestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {Review} from "../model/review";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseAuth = inject(Auth);
  private _firestore = inject(Firestore);

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() =>{});
    return from(promise);
  }

  logout() {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  register(email: string, username: string, last_name: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async response => {
        console.log("Response register: ", response);
        try {
          const profilePic: string = 'https://png.pngtree.com/background/20230525/original/pngtree-an-egg-with-a-sad-face-sitting-on-a-dark-background-picture-image_2726098.jpg'
          await this.saveUserData(username, last_name, email, password, profilePic);
          // await this.verifyUserEmail();
          return updateProfile(response.user, {displayName: username});
        } catch(error) {
          console.error("Ha habido un error al guardar sus datos.")
        }
      });
    return from(promise)
  }


  async getReviewById(reviewId: string): Promise<Review | undefined> {
    try {
      const docRef = doc(this._firestore, "reviews", reviewId);
      const docSnap: DocumentSnapshot<any> = await getDoc(docRef);

      if (docSnap.exists()) {
        const reviewData = docSnap.data();
        return {
          ...reviewData,
        };
      } else {
        console.log("No se encontró ningún review con el ID proporcionado.");
        return undefined;
      }
    } catch (error) {
      console.error("Error al obtener el review:", error);
      return undefined;
    }
  }
  async saveUserData(username: string, last_name: string, email: string, password: string, profilePictureURL?:string) {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const userRef = doc(this._firestore, 'users/' + user?.uid);

        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        if(userData) {
          await updateDoc(userRef, {
            'username': username,
            'last_name': last_name,
          });
          // await this.updateUserEmail(email, password);
          return true;
        } else {
          await setDoc(userRef, {
            'username': username,
            'last_name': last_name,
            'profilePictureURL': profilePictureURL
          }, { merge: true });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Ha ocurrido un error al guardar los datos:", error);
      return false;
    }
  }


  private async verifyUserEmail() {
    const auth = getAuth();
    if(auth.currentUser) {
      const result = await sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("Email de verificación enviado.");
        });
    }
  }

  /* Para que updateUserEmail funcione el usuario tiene que poner su correo de verdad y
  * verificarlo. Aún así, Firebase da un error de autorización.
  * */
  private async updateUserEmail(newEmail: string, password: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const result =  await this.reauthenticateUser(password);
        console.log("Result update email");
        if(result) {
          console.log("Result update email", result)
          await updateEmail(user, newEmail);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
      return false;
    }
  }

  async updateUserPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const result = await this.reauthenticateUser(oldPassword);
        if(result) {
          await updatePassword(user, newPassword);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Ha ocurrido un error al actualizar la contraseña: ", error);
      return false;
    }
  }

  private async reauthenticateUser(password: string): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (user) {
        const credential = EmailAuthProvider.credential(
          <string> user.email,
          password
        );
        await reauthenticateWithCredential(user, credential);
        return true;
      } else {
        console.error("No hay usuario actualmente autenticado");
        return false;
      }
    } catch (error) {
      console.error("Ha ocurrido un error con la confirmación de usuario, ", error);
      return false;
    }
  }

  async uploadProfilePicture(profilePicture: File, username: String): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;

    if(user) {
      const storage = getStorage();
      const storagePath = user.uid + '/' + 'profilePicture.jpg';
      const storageRef = ref(storage, storagePath);

      try {
        await uploadBytes(storageRef, profilePicture);
        await this.saveProfilePictureUrl(username ,await getDownloadURL(storageRef))
        console.log("Imagen cargada con éxito!");
        return true;
      } catch (error) {
        console.error("Ha habido un error al cargar la imagen.");
        return false;
      }
    } else {
      return false;
    }
  }

  async updateData(username: String): Promise<boolean> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);

        await updateDoc(userDocRef, {
          username: username
        });

        console.log('Username actualizado correctamente.');
        return true;
      } else {
        console.error('No se pudo encontrar al usuario actualmente autenticado.');
        return false;
      }
    } catch (error) {
      console.error('Error al actualizar el username:', error);
      return false;
    }

  }


  private async saveProfilePictureUrl(username: String, profilePictureURL: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const userRef = doc(this._firestore, 'users', user.uid);

        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        if(userData && userData['profilePictureURL']) {
          console.log(userData['profilePictureURL'])
          await updateDoc(userRef, {
            ['profilePictureURL']: profilePictureURL,
            ['username']: username,
          })
          return true;
        }
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Ha ocurrido un error al guardar la URL de la imagen de perfil:", error);
      return false;
    }
  }

}
