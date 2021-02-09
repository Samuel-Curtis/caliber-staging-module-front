import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwotService } from 'src/app/services/swot/swot.service';
import { UpdateBatchPayload } from '../view-associate/update-batch-payload';
import { UpdateSwotComponent } from './update-swot.component';

fdescribe('UpdateSwotComponent', () => {
 
  class MockService {
    updateBatch(updatePayload: UpdateBatchPayload) { }
  }

  let dummyForm = new FormGroup({
    inputedBatchId: new FormControl(1),
  })
  
  let component: UpdateSwotComponent;
  let fixture: ComponentFixture<UpdateSwotComponent>;
  let router: Router;
  let swotServ: SwotService;
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), ReactiveFormsModule, FormsModule ],
      providers: [{provide: SwotService, useClass: MockService}, 
                  {provide: HttpClient, useValue: mockClient}],
      declarations: [ UpdateSwotComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UpdateSwotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    swotServ = TestBed.inject(SwotService);
    mockClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have correct text pre populated", () => {
    fixture.detectChanges();
    let pageTitle = fixture.debugElement.query(By.css("h1")).nativeElement;
    expect(pageTitle.innerHTML).toBe("Update Description");
  });

  it('should call the onSubmit() method', waitForAsync(()=>{
    let changeDescButton = fixture.debugElement.query(By.css('button')).nativeElement;
    spyOn(component, 'onSubmit').withArgs();
    changeDescButton.click();

    fixture.whenStable().then(()=>{
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));
});
