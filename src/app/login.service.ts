import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080'; // Mettez à jour avec votre URL backend
  
  constructor(private http: HttpClient) { }

  login(username: string, mot_de_passe: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, mot_de_passe };
    return this.http.post(this.baseUrl+'/admin/login', body, { headers });
  }
}
