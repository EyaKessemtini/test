import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  registerAdmin(admin: any) {
      return this.http.post(this.baseUrl+'/api/admin/register', admin);
  }
}
