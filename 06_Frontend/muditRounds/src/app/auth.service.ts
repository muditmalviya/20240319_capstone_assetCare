import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { response } from 'express';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private user: any = null;

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }


  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUser(): any {
  //   if (!this.user) {
  //     const user = localStorage.getItem('user')
  //     if (user) {
  //       return user;
  //     }
  //     if(this.getToken()) {
  //       // API call maar de
  //     }
  //     else {
  //       return {}
  //     }
  //   }
  //   return this.user;
  // }




getUser(): Observable<any> {
  if (!this.user) {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      return of(this.user);
    }
    if (this.getToken()) {
      return this.http.get('http://localhost:3000/api/profile').pipe(
        tap(user => {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
    } else {
      return of({});
    }
  }
  return of(this.user);
}

  isAuthenticated(): boolean {
    return !!this.getToken();
  }




  request(method: string, url: string, data?: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    const baseUrl = "http://localhost:3000"

    return this.http.request(method, `${baseUrl}/${url}`, {
      headers,
      body: data,
      observe: 'response'
    });
  }
}