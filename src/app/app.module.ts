import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SwotComponent } from './components/swot/swot.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ViewAssociateComponent } from './components/view-associate/view-associate.component';
import { ViewSwotComponent } from './components/view-swot/view-swot.component';
import { CorsInterceptor } from './services/interceptor/cors.interceptor';
import { UpdateAssociateComponent } from './components/update-associate/update-associate.component';
import { UpdateSwotComponent } from './components/update-swot/update-swot.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor } from './services/interceptor/jwt.interceptor';

import { ViewFeedbackComponent } from './components/view-feedback/view-feedback.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';
import { UpdateFeedbackComponent } from './components/update-feedback/update-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ViewAssociateComponent,
    SwotComponent,
    LoginComponent,
    HomeComponent,
    ViewSwotComponent,
    UpdateItemComponent,
    AddItemComponent,
    UpdateAssociateComponent,
    UpdateSwotComponent,
    ToastMessageComponent,
    ViewFeedbackComponent,
    AddFeedbackComponent,
    UpdateFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
