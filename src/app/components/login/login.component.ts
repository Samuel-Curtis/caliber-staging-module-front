import { LoginService } from './../../services/login-service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    const manager = this.loginForm.value;
    this.ngFireAuth
      .signInWithEmailAndPassword(manager.email, manager.password)
      .then(({ user }) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.loginService.getManagerId(user.email).subscribe((managerId) => {
          sessionStorage.setItem('managerId', managerId);
          this.router.navigate(['home']);
        });
      })
      .catch((error) => console.error('Error while logging in user: ', error));
  }
}
