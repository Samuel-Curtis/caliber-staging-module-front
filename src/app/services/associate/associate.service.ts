import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Associate } from '../../models/associate-model/associate.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UpdateBatchPayload } from 'src/app/components/view-associate/update-batch-payload';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*/*',
      'Access-Control-Allow-Methods':
        'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',
    }),
  };
  /**
   * This returns all associates from the database to be displayed on the staging managers
   * 'View All Associates' page view
   * @param id Is an integer that represents the Associate's reference ID
   */
  getAllAssociates(id: number): Observable<Associate[]> {
    return this.http.get<Associate[]>(
      `${environment.BASE_URL}associates?manager=${id}`,
      this.httpOptions
    );
  }

/**
 * This returns new associates from the database to be displayed on the staging managers
 * 'View New Associates' page  view
 * @param id Is an integer that represents the Associate's reference ID
 */
  getAllNewAssociates(id: number): Observable<Associate[]> {
    return this.http.get<Associate[]>(
      `${environment.BASE_URL}associates/new?manager=${id}`,
      this.httpOptions
    );
  }

  /**
   * Sends an updated version of the batch to the back end
   * 
   */
  updateBatch(updatePayload: UpdateBatchPayload): any {
    return this.http.put(`${environment.BASE_URL}associates`, updatePayload, {
      observe: 'body',
      responseType: 'text'
    });
  }

}
