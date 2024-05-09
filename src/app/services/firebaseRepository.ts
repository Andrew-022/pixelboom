import {inject, Injectable} from "@angular/core";
import {collection, collectionData, doc, DocumentSnapshot, Firestore, getDoc} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {game} from "../model/game";
import {Article} from "../model/article";

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
}
