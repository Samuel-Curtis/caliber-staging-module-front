import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feedback } from './../../models/feedback-model/feedback.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  httpOptions = { responseType: "text" as "json" }

  constructor(private http: HttpClient) { }

  /**
   * This retrieves the feedback by associate Id
   */
  getFeedbackByAssociateId(id: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${environment.BASE_URL}feedback/associate/${id}`)
      .pipe(
        catchError(this.handleError<Feedback[]>('getAllFeedback', []))
      );
  }

  /**
   * This adds the feedback passed as an argument to the database
   */
  addFeedback(feedback: Feedback): Observable<string> {
    let feedbackDTO = {
      id: feedback.id,
      managerId: feedback.managerId,
      content: feedback.content,
      associateId: feedback.associateId,
    }
    let associateId = feedback.associateId;
    
    return this.http.post<string>(`${environment.BASE_URL}feedback`, feedbackDTO, this.httpOptions)
    .pipe(
      catchError(this.handleError<string>('addFeedback'))
    );
  }

  /**
   * This updates the feedback passed as an argument
   */
  updateFeedback(feedback: Feedback): Observable<string> {
    let feedbackDTO = {
      id: feedback.id,
      managerId: feedback.manager.id,
      content: feedback.content,
      associateId: feedback.associateId
    }
    
    return this.http.put<string>(`${environment.BASE_URL}feedback/${feedback.id}`, feedbackDTO, this.httpOptions)
    .pipe(
      catchError(this.handleError<string>('updateFeedback'))
    );
  }

  /**
   * This deletes the feedback by its id passed as an argument
   */
  deleteFeedback(feedbackId: number): Observable<string> {
    return this.http.delete<string>(`${environment.BASE_URL}feedback/${feedbackId}`, this.httpOptions)
      .pipe(catchError(this.handleError<string>("deleteFeedback"))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T);
    }
  }
}