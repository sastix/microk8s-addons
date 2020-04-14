import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;

  constructor(private http: HttpClient) {
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams(), responseType?): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${path}`, {params, responseType})
      .pipe(catchError(this.formatErrors));
  }

  getToken(params: HttpParams = new HttpParams(), responseType?): Observable<any> {
    return this.http.get(`/cb/token.txt`, {params, responseType})
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${path}`, JSON.stringify(body),
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), params})
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, params: HttpParams = new HttpParams(), responseType?): Observable<any> {
    if(this.token) {
      body['callback'] = this.token;
    }
    return this.http.post(`${environment.apiUrl}/${path}`, JSON.stringify(body),
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        params,
        responseType: responseType,
        observe: 'response'
      })
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
