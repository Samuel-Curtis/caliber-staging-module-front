import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if(!sessionStorage.getItem('managerId')){
      this.router.navigate(['login']);
    } 
   }

  /**
   * This function logs out user when the logout button is clicked.
   */
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }
}
