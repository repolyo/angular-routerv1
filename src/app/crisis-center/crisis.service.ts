import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crisis } from './crisis';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crisesUrl = 'api/crises';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** Log a CrisisService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CrisisService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET crises from the server */
  getCrises(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisesUrl)
      .pipe(
        tap(_ => this.log('fetched crises')),
        catchError(this.handleError<Crisis[]>('getCrisises', []))
      );
  }

  /** GET crisis by id. Will 404 if id not found */
  getCrisis(id: number|string): Observable<Crisis> {
    const url = `${this.crisesUrl}/${id}`;
    return this.http.get<Crisis>(url).pipe(
      tap(_ => this.log(`fetched crisis id=${id}`)),
      catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
    );
  }

  /** PUT: update the crisis on the server */
  updateCrisis(crisis: Crisis): Observable<any> {
    return this.http.put(this.crisesUrl, crisis, this.httpOptions).pipe(
      tap(_ => this.log(`updated crisis id=${crisis.id}`)),
      catchError(this.handleError<any>('updateCrisis'))
    );
  }

  /** POST: add a new crisis to the server */
  addCrisis(crisis: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.crisesUrl, crisis, this.httpOptions).pipe(
      tap((newCrisis: Crisis) => this.log(`added crisis w/ id=${newCrisis.id}`)),
      catchError(this.handleError<Crisis>('addCrisis'))
    );
  }

  /** DELETE: delete the crisis from the server */
  deleteCrisis(crisis: Crisis | number): Observable<Crisis> {
    const id = typeof crisis === 'number' ? crisis : crisis.id;
    const url = `${this.crisesUrl}/${id}`;

    return this.http.delete<Crisis>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted crisis id=${id}`)),
      catchError(this.handleError<Crisis>('deleteCrisis'))
    );
  }

  /* GET crises whose name contains search term */
  searchCrises(term: string): Observable<Crisis[]> {
    if (!term.trim()) {
      // if not search term, return empty crisis array.
      return of([]);
    }
    return this.http.get<Crisis[]>(`${this.crisesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found crises matching "${term}"`)),
      catchError(this.handleError<Crisis[]>('searchCrisises', []))
    );
  }
}
