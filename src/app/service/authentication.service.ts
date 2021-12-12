import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'app/models';
import { Role } from 'app/types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {AngularFireAuth} afAuth
   * @param {AngularFirestore} afs
   * @param {ToastrService} _toastrService
   */
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.ADMIN;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.CONTROLLER;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(({ user }) => {
      // login successful if there's a jwt token in the response
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return this.afs.collection('users').doc(user.uid).ref.get().then(userDoc => {
          console.log(userDoc)
          if (userDoc.exists) {
            const data = userDoc.data() as User
            // const id = userDoc.id
            this.currentUserSubject.next(data);
            localStorage.setItem('currentUser', JSON.stringify(data))
            // Display welcome toast!
            this._toastrService.success(
              'You have successfully logged in as an ' +
              'admin' +
              ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
              '👋 Welcome, ' + user.displayName + '!',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
            return true
            // notify
          } else {
            console.log('no user data')
          }
        })

      } else {
        console.log('Not longin')
      }
    })
  }

  /**
   * User logout
   *
   */
  logout() {
    this.afAuth.signOut().then(
      () => {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // notify
        this.currentUserSubject.next(null);
      }
    )

  }
}
