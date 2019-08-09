import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Base url
  baseurl = 'https://api.halifax.co.uk/open-banking/v2.2';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'accept': 'application/prs.openbanking.opendata.v2.2+json'
    })
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }

  fetch(type: string): Observable<any> {
    let data;
    return this.get(type).pipe(map(result => {
      data = result.data[0].Brand[0];
      return data[type];
    }));
  }

  // GET
  get(type: string): Observable<any> {
    let path: string;
    switch (type) {
      case "Branch": { 
        path = '/branches'; 
        break; 
     } 

     default: { 
        type = "Branch";
        path = '/branches'; 
        break; 
     } 
    }

    return this.http.get<any>(this.baseurl + path)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
 
}

