import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employe } from './model/employe';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  private ROOT_URL = 'http://localhost:8090/api';

  constructor(private http:HttpClient) {

  }

  get() :Observable<employe[]>
  {
    return this.http.get<employe[]>(`${this.ROOT_URL}/` );
  }

  getById(id:number) :Observable<employe[]>
  {
    return this.http.get<employe[]>(`${this.ROOT_URL}/${id}` );
  }

  createEmployee(employee: employe): Observable<Object>{
    return this.http.post(`${this.ROOT_URL}`, employee);
  }

  patch(uri:string,payload:object)
  {
    this.http.patch('${this.ROOT_URL}/${uri}',payload);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }




}
