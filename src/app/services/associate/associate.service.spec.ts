import { environment } from './../../../environments/environment';
import { AppRoutingModule } from './../../app-routing.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';

import { AssociateService } from './associate.service';
import { Associate } from 'src/app/models/associate-model/associate.model';

const dummyAssociateData = new Associate(1, "1", "test@email.com", "firstname", "lastname", 1, 1, "status");
const dummyUpdatePayload = {
  associate_id: 1,
  batch_id: 1,
  status_id: 0
}
const dummyUpdateBatchResp = "Associate updated successfully";

describe('AssociateService', () => {
  let service: AssociateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule
        
       ],
        providers: [ AngularFireModule, AppRoutingModule],
    });
    service = TestBed.inject(AssociateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllAssociates(id) return data', ()=>{
    service.getAllAssociates(1).subscribe(
      response => {
        expect(response.toString()).toEqual(dummyAssociateData.toString());
      }
    );

    const req = httpMock.expectOne(`${environment.BASE_URL}associates?manager=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAssociateData);
  });

  it('should have getAllNewAssociates(id) return data', ()=>{
    service.getAllNewAssociates(1).subscribe(
      response => {
        expect(response.toString()).toEqual(dummyAssociateData.toString());
      }
    );

    const req = httpMock.expectOne(`${environment.BASE_URL}associates/new?manager=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAssociateData);
  });

  it('should have updateBatch(updatePayLoad) return a status string', ()=>{
    service.updateBatch(dummyUpdatePayload).subscribe(
      response => {
        expect(response.toString()).toEqual(dummyUpdateBatchResp.toString());
      }
    );

    const req = httpMock.expectOne(`${environment.BASE_URL}associates`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUpdateBatchResp);
  });
});