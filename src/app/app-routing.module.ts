import { SwotComponent } from './components/swot/swot.component';
import { ViewAssociateComponent } from './components/view-associate/view-associate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSwotComponent } from './components/view-swot/view-swot.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ViewFeedbackComponent } from './components/view-feedback/view-feedback.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view', 
    component: ViewSwotComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {path: 'swot',
  component: SwotComponent,
  canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {path: 'view/:associateId',
  component: ViewSwotComponent,
  canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {path: 'updateItem', component: UpdateItemComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectUnauthorizedToLogin
  }},

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },

  {path: 'feedback/:associateId',
  component: ViewFeedbackComponent,
  canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
