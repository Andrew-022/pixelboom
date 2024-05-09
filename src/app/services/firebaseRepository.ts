import {inject, Injectable} from "@angular/core";
import {collection, collectionData, doc, Firestore, getDoc, DocumentSnapshot} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {game} from "../model/game";

@Injectable({
  providedIn: "root",
})

export class firebaseRepository {
  private _firestore = inject(Firestore);

  async getAllGames(){
    return collectionData(collection(this._firestore,"games")) as Observable<game[]>
  }
}
