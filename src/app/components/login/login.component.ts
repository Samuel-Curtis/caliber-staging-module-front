import { LoginService } from './../../services/login-service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public auth: AngularFireAuth, private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // This code seems to fix the issue. Please test this version of the login on your local machines.
  // Please read comments to understand changes. -AK
  // tslint:disable-next-line:typedef
  async loginUser() {
    // Step 0: get login form information
    const manager = this.loginForm.value;
    console.log(manager);

    // Step 1: set the auth service provider
    const provider = new firebase.auth.EmailAuthProvider();

    // Step 3: sign in user
    // Please note the fact of this function is now async to fix the threading issue during logins
    await this.auth.signInWithEmailAndPassword(manager.email,manager.password)
      .then(user => {
        const currentUser = {
          email: manager.email,
          firebaseCredentials: user
        };
        console.log('Successful login! User signed in is: ', currentUser);
        console.log(currentUser);
        // Step 4: After successful login, store user info in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log('Now going to homepage...');
        this.loginService.storeManagerIdFromServer(currentUser.email);
        this.sleep(500);
        // Step 5: Redirect user to home page
        this.router.navigate(['home']);
      })
      .catch(error => console.log('Error while logging in user: ', error));

  }
   sleep(milliseconds){
    const date = Date.now();
    let currentDate = null;
    do{
      currentDate = Date.now();
    }while(currentDate - date < milliseconds);
  }
  

}
