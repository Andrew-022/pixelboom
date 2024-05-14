import {inject, Injectable} from "@angular/core";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  updateDoc
} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {game} from "../model/game";
import {Article} from "../model/article";
import {Review} from "../model/review";
import {getAuth} from "@angular/fire/auth";
import {runTransaction} from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})

export class firebaseRepository {
  private _firestore = inject(Firestore);

  async getAllGames(){
    return collectionData(collection(this._firestore,"games")) as Observable<game[]>
  }
  async getAllArticles(): Promise<Observable<Article[]>> {
    return collectionData(collection(this._firestore, "articles")).pipe(
      map((articles: any[]) => {
        return articles.map(article => {
          return {
            ...article,
            date: this.formatDate(article.date)
          };
        });
      })
    );
  }
  async getArticleById(articleId: string): Promise<Article | undefined> {
    try {
      const docRef = doc(this._firestore, "articles", articleId);
      const docSnap: DocumentSnapshot<any> = await getDoc(docRef);
      if (docSnap.exists()) {
        const articleData = docSnap.data();
        const formattedDate = this.formatDate(articleData.date);
        return {
          ...articleData,
          id: docSnap.id,
          date: formattedDate
        };
      } else {
        console.log("No se encontró ningún artículo con el ID proporcionado.");
        return undefined;
      }
    } catch (error) {
      console.error("Error al obtener el artículo:", error);
      return undefined;
    }
  }
  private formatDate(timestamp: any): string {
    const dateObject = new Date(timestamp.seconds * 1000);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  }

  private getReviewsByGame(game: game) {

  }

  async addReview(review: Review): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      review.userId = user?.uid ?? '';
      console.log(review);
      const docRef = await addDoc(collection(this._firestore, `reviews`), review);
      console.log("Review añadida correctamente con ID:", docRef.id);
      this.addReviewToArray(docRef.id, review.gameId, review.rating);
    } catch (error) {
      console.error("Error al añadir la review:", error);
    }
  }

  // async addReviewToArray(review: string, documentId: string): Promise<void> {
  //   try {
  //     const documentRef = doc(this._firestore, 'games', documentId);
  //     await updateDoc(documentRef, {
  //       reviews: arrayUnion(review)
  //     });
  //     console.log("Valor añadido al array 'reviews' correctamente.");
  //   } catch (error) {
  //     console.error("Error al añadir valor al array 'reviews':", error);
  //   }
  // }


  async addReviewToArray(review: string, documentId: string, score: number): Promise<void> {
    try {
      const documentRef = doc(this._firestore, 'games', documentId);
      const docSnapshot = await getDoc(documentRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const currentReviews = data['reviews'] || [];
        const updatedReviews = [...currentReviews, review];
        const nReviews = updatedReviews.length;
        let currentScore = data['score'] || 0; // Si score no está definido, se asume 0
        const newScore = (currentScore *); // Calcular nuevo scor

        await updateDoc(documentRef, {
          ['reviews']: updatedReviews,
          ['nReviews']: nReviews,
          ['score']: newScore
        });

        console.log("Valor añadido al array 'reviews', 'nReviews' y 'score' actualizados correctamente.");
      } else {
        console.error("Documento no encontrado para actualizar.");
      }
    } catch (error) {
      console.error("Error al añadir valor al array 'reviews':", error);
    }
  }
}
