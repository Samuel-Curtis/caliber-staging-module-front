import { LoginService } from './../../services/login-service/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  /**
   *  This function logs in the user when the log in button is clicked.
   */
  async loginUser() {
    // Step 0: get login form information
    const manager = this.loginForm.value;

    // Step 1: set the auth service provider
    const provider = new firebase.auth.EmailAuthProvider();
    // Step 3: sign in user

    // Please note the fact of this function is now async to fix the threading issue during logins
    await this.auth
      .signInWithEmailAndPassword(manager.email, manager.password)
      .then((user) => {

        const currentUser = {
          email: manager.email,
          firebaseCredentials: user,
        };
        // Step 4: After successful login, store user info in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        this.loginService
          .postManager(currentUser.email)
          .subscribe((response) => {
            sessionStorage.setItem('managerId', response.message);
            this.router.navigate(['home']);
          });
      })
      .catch((error) => console.error('Error while logging in user: ', error));
  }
}
