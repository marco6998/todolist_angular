import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AuthService {
  url: string = environment.apiUrl + '/auth';
  constructor(
    private http: HttpClient
  ) { }

  findUsername(username: string): Observable<any> {
    return timer(2000)
      .pipe(
        switchMap(() => {
          return this.http.get(`${this.url}/user/username?name=${username}`)
        })
      )
  }
  signup(): Observable<any> {
    return thishtttp.post(`${this.url}/signup`, user);
  }
}
