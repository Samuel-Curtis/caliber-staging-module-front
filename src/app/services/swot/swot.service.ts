import { Observable, of } from 'rxjs';
import { Swot } from './../../models/swot-model/swot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { SwotItem } from 'src/app/models/swot-model/swot-item';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SwotService {

  httpOptions = {
    headers: new HttpHeaders({})
  }

 

  constructor(private http :HttpClient) { }

/**
 * This creates a swot object to be sent to the backend
 * @param swotAnalysis - the swot to be added to the database
 */
  addSwot(swotAnalysis: Swot): Observable<any> {
    console.log("this should be a swot");
    console.log(swotAnalysis)
    return this.http.post<any>(`${environment.BASE_URL}swot/create`, swotAnalysis, this.httpOptions)
      .pipe(
        tap((newSwotAnalysis: Swot) => console.log(newSwotAnalysis)), //captures the response and handles it if its a response
        catchError(this.handleError<any>('addSwot')) //this handles if it is an error
      )
  }

  /**
   * This forms an http request intended to delete a swot.
   * @param swotId - the id of the swot to be deleted
   */
  deleteSwot(swotId: number): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}swot/delete/${swotId}`);
  }

  /**
   * This method handles any errors that occur during the other methods in this class.
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T);
    }
  }

/**
 * This method performs a get request that returns an array of swot's based on an associate Id
 * @param id 
 */
  getSwotByAssociatedId(id: number): Observable<Swot[]> {
    return this.http.get<Swot[]>(`${environment.BASE_URL}swot/view/${id}`)
      .pipe(
        catchError(this.handleError<Swot[]>('getAllSwots', []))
      );
  }


 /**
  * This method performs a post request that returns a swot based on a specified Id
  * @param id 
  */
  getItem(id: number): Observable<SwotItem> {
    console.log(id);
    return this.http.post<SwotItem>(`${environment.BASE_URL}getSwotItem`, {id: id}, this.httpOptions)
      .pipe(
        catchError(this.handleError<SwotItem>('getTask'))
      );
  }

  /**
   * This method makes a PUT request to update a swot item's information.
   * @param swotItem 
   */
  updateItem(swotItem: SwotItem): Observable<SwotItem> {
    let swotItemDTO = {
      id: swotItem.id,
      name: swotItem.name,
      type: swotItem.type,
      note: swotItem.note,
      swot: {
        id: swotItem.swotAnalysisId
      }
    }
    return this.http.put<SwotItem>(`${environment.BASE_URL}swot/item/update/${swotItemDTO.id}`, swotItemDTO, this.httpOptions)
      .pipe(
        catchError(this.handleError<SwotItem>('updateSwot'))
      );
  }

  /**
   * This method makes a post request that passes along a new swot item to be added
   * @param swotItem 
   */
  addItem(swotItem: SwotItem): Observable<SwotItem> {
    let swotItemDTO = {
      id: swotItem.id,
      name: swotItem.name,
      type: swotItem.type,
      note: swotItem.note,
      swot: {
        id: swotItem.swotAnalysisId
      }
    }
    console.log(swotItem);
    return this.http.post<SwotItem>(`${environment.BASE_URL}swot/item/new`, swotItemDTO, this.httpOptions)
    .pipe(
      catchError(this.handleError<SwotItem>('addSwotItem'))
    )
  }

  /**
   * This method make a delete request to delete a swot item based on Id
   * @param swotItemId 
   */
  deleteItem(swotItemId : number) : Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}swot/item/delete/${swotItemId}`)
      .pipe(
        catchError(this.handleError<any>('deleteSwotItem'))
      );
  }

}



