import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getColumns(start, end): string[]{
    const colums = [ "Name", "Account Number", "Coutry", "Date Joined","Vote", "Email Address", "Postal Address","Phone Number", "Favourite Band"];
    return colums.slice(start, end);
  };

  getJsonLabels(): string[]{
    return ["name", "acountNumber", "country", "dateJoined", "vote"];
  
  };


  url = 'http://localhost:400';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`)
      .pipe(
       catchError(this.handleError<User[]>('getUser', []))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
