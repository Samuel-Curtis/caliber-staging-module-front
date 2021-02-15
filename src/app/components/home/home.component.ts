import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void { }

  /**
   * This function logs out user when the logout button is clicked.
   */
  logOut() {
    debugger;

    this.auth
      .signOut()
      .then(() => this.router.navigate(['']))
      .catch((error) =>
        console.log(`Failed to log user out. Error => `, error)
      );
    sessionStorage.clear();
  }
}
