import { environment } from './../../../environments/environment';
import { AppRoutingModule } from './../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { SwotComponent } from './swot.component';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SwotComponent', () => {
  let component: SwotComponent;
  let fixture: ComponentFixture<SwotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        FormsModule
       ],
        providers: [ HttpClientModule, AngularFireModule, AppRoutingModule],
      declarations: [ SwotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message if name is not entered and add item is clicked', () => {
    let addItemButton = fixture.debugElement.query(By.css('#additembutton')).nativeElement;
    addItemButton.click();
    let message = fixture.debugElement.query(By.css('#message')).nativeElement;
    expect(message.innerHTML).toBe('Please enter SWOT item name.');
  });
});
