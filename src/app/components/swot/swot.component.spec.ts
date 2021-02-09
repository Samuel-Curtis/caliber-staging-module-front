import { environment } from './../../../environments/environment';
import { AppRoutingModule } from './../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { SwotComponent } from './swot.component';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs';



describe('SwotComponent', () => {
  let component: SwotComponent;
  let fixture: ComponentFixture<SwotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        FormsModule,
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

  fit('should create', () => {
    expect(component).toBeTruthy();
  });


  fit('should check name field is updated with row after adding item', async(() => {
    let nameField: HTMLInputElement = fixture.debugElement.query(By.css('#name')).nativeElement;
    let typeField: HTMLInputElement = fixture.debugElement.query(By.css('#type')).nativeElement;
    let addItemButton: HTMLInputElement = fixture.debugElement.query(By.css('#add-item')).nativeElement;

    nameField.value = 'Java';
    typeField.value = 'Strength';
    nameField.dispatchEvent(new Event('input'));
    typeField.dispatchEvent(new Event('input'));
    fixture.detectChanges();


    addItemButton.click();
    fixture.detectChanges();

    let itemTable: HTMLInputElement = fixture.debugElement.query(By.css('#item-table')).nativeElement;
    let headerColumnCount = 1;
    fixture.whenStable().then(() => {
      expect(itemTable.childElementCount).toEqual(1 + headerColumnCount);
    })
  }));

  fit('should check description field does exist after adding item', async(() => {
    let nameField: HTMLInputElement = fixture.debugElement.query(By.css('#name')).nativeElement;
    let typeField: HTMLInputElement = fixture.debugElement.query(By.css('#type')).nativeElement;
    let addItemButton: HTMLInputElement = fixture.debugElement.query(By.css('#add-item')).nativeElement;

    nameField.value = 'Java';
    typeField.value = 'Strength';
    nameField.dispatchEvent(new Event('input'));
    typeField.dispatchEvent(new Event('input'));
    fixture.detectChanges();


    addItemButton.click();
    fixture.detectChanges();

    let descriptionField: HTMLInputElement = fixture.debugElement.query(By.css('#description')).nativeElement;

    fixture.whenStable().then(() => {
      expect(descriptionField).toBeTruthy();
    })
  }));


  fit('should call addSwot when clicking submit button', async(() => {
    let nameField: HTMLInputElement = fixture.debugElement.query(By.css('#name')).nativeElement;
    let typeField: HTMLInputElement = fixture.debugElement.query(By.css('#type')).nativeElement;
    let addItemButton: HTMLInputElement = fixture.debugElement.query(By.css('#add-item')).nativeElement;

    nameField.value = 'Java';
    typeField.value = 'Strength';
    nameField.dispatchEvent(new Event('input'));
    typeField.dispatchEvent(new Event('input'));
    fixture.detectChanges();


    addItemButton.click();
    fixture.detectChanges();

    let submitButton: HTMLInputElement = fixture.debugElement.query(By.css('#submit-button')).nativeElement;
    spyOn(component, 'addSwot');
    submitButton.click();

    fixture.whenStable().then(()=>{
      expect(component.addSwot).toHaveBeenCalled();
    });
  }));

  it('should display a message if name is not entered and add item is clicked', () => {
    let addItemButton = fixture.debugElement.query(By.css('#additembutton')).nativeElement;
    addItemButton.click();
    let message = fixture.debugElement.query(By.css('#message')).nativeElement;
    expect(message.innerHTML).toBe('Please enter SWOT item name.');
  });
});
