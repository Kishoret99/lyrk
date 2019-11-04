import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  constructor(private angularFireStore: AngularFirestore) { }

  getCollection(collectionRef) {
    const collection = this.angularFireStore.collection(collectionRef);
    return collection.valueChanges();
  }
}
