import { SwotComponent } from './components/swot/swot.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewAssociateComponent } from './components/view-associate/view-associate.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';

import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ViewSwotComponent } from './components/view-swot/view-swot.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CorsInterceptor } from './services/interceptor/cors.interceptor';
import { UpdateAssociateComponent } from './components/update-associate/update-associate.component';
import { UpdateSwotComponent } from './components/update-swot/update-swot.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    // ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
