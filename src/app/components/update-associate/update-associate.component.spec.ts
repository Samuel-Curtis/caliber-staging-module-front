import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssociateService } from 'src/app/services/associate/associate.service';
import { UpdateBatchPayload } from '../view-associate/update-batch-payload';

import { UpdateAssociateComponent } from './update-associate.component';

describe('UpdateAssociateComponent', () => {
 
  class MockService {
    updateBatch(updatePayload: UpdateBatchPayload) { }
  }

  let dummyForm = new FormGroup({
    inputedBatchId: new FormControl(1),
  })
  
  let component: UpdateAssociateComponent;
  let fixture: ComponentFixture<UpdateAssociateComponent>;
  let router: Router;
  let associateServ: AssociateService;
  let model: NgbActiveModal;
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), ReactiveFormsModule, FormsModule ],
      providers: [{provide: AssociateService, useClass: MockService}, 
                  {provide: HttpClient, useValue: mockClient},
                  {provide: NgbActiveModal, useClass: MockService}],
      declarations: [ UpdateAssociateComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UpdateAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    associateServ = TestBed.inject(AssociateService);
    model = TestBed.inject(NgbActiveModal);
    mockClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have correct text pre populated", () => {
    fixture.detectChanges();
    let pageTitle = fixture.debugElement.query(By.css("h1")).nativeElement;
    let assocId = fixture.debugElement.query(By.css("#assocId")).nativeElement;
    let batchId = fixture.debugElement.query(By.css("#batchId")).nativeElement;
    let assocStatus = fixture.debugElement.query(By.css("#assocStatus")).nativeElement;
    //expect(pageTitle.innerHTML).toBe('<u _ngcontent-a-c100="">Update Associate</u>');
    expect(assocId.innerHTML).toContain("Associate ID:");
    expect(batchId.innerHTML).toContain("Current Batch ID:");
    expect(assocStatus.innerHTML).toContain("Current Status:");
  });

  it('should call the onSubmit() method', waitForAsync(()=>{
    let loginButton = fixture.debugElement.query(By.css('button')).nativeElement;
    spyOn(component, 'onSubmit').withArgs();
    loginButton.click();

    fixture.whenStable().then(()=>{
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));
});
