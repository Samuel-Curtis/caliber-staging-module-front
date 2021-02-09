import { AppRoutingModule } from './../../app-routing.module';
import { environment } from './../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { ViewSwotComponent } from './view-swot.component';

describe('ViewSwotComponent', () => {
  let component: ViewSwotComponent;
  let fixture: ComponentFixture<ViewSwotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule
       ],
        providers: [ HttpClientModule, AngularFireModule, AppRoutingModule],
      declarations: [ ViewSwotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSwotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

});
