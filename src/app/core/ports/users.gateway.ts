import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { UserSearch } from '../models/user-search.model';

@Injectable({
  providedIn: 'root',
})
export class UsersGateway {
  constructor(private  http: HttpClient) {}

  fetchUsers = (search: UserSearch): Observable<User[]> => {
    let params = new HttpParams()
    if (search.name) params = params.append('name',search.name)
    if (search.username) params = params.append('username',search.username)
    if (search.email) params = params.append('email', search.email);
    if (search.availableOnly) params = params.append('available',true)
    return this.http.get<User[]>(`${environment.apiUrl}/users`,{params});
  }
}
