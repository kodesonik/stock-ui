import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/models';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class ApiService {
  /**
   *
   * @param {AngularFirestore} afs
   */
  constructor(private afs: AngularFirestore) {}

  /**
   * Get all users
   */
  getAll(path: string) {
    return this.afs.collection(path, ref => ref.where('deletedAt', '==', null)).valueChanges({ idField: 'id'})
  }

  /**
   * Get user by id
   */
  getById(path: string, id: string) {
    return this.afs.collection(path).doc(id).valueChanges()
  }

  add(path: string, data: any) {
    return this.afs.collection(path).add(data)
  }

  edit(path: string, id: string, data) {
    data.lastUpdatedAt = firebase.firestore.FieldValue.serverTimestamp()
      return this.afs.collection(path).doc(id).update(data)
  }

  delete(path: string, id: string) {
      return this.afs.collection(path).doc(id).delete()
  }

  softDelete(path: string, id: string) {
      const deletedAt = firebase.firestore.FieldValue.serverTimestamp()
    return this.afs.collection(path).doc(id).update({ deletedAt })
}

}
