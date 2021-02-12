import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Manager } from 'src/app/models/manager-model/manager';
import { environment } from 'src/environments/environment';

import { FeedbackService } from './feedback.service';
const dummydata = {
  id: 1,
  managerId: 2,
  date: null,
  content: "content",
  associateId: 2,
  manager: null
}
describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        HttpClientTestingModule
      ],
      providers: [HttpClientModule, AngularFireModule, AppRoutingModule, FeedbackService],
    });
    service = TestBed.inject(FeedbackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deletes feedback and returns the posted data as a response', () => {
    service.deleteFeedback(1).subscribe((res) => {
      expect(res.valueOf()).toEqual(dummydata.toString());
    });
    const req = httpMock.expectOne("http://localhost:8081/feedback/1");
    expect(req.request.method).toBe('DELETE');
  });
});
