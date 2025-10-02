import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Credito} from './credito';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private apiUrl = `${environment.apiUrl}/creditos`;

  constructor(private http: HttpClient) { }

  // GET /api/creditos/{numeroNfse}
  buscarPorNumeroNfse(numeroNfse: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/${numeroNfse}`);
  }

  // GET /api/creditos/credito/{numeroCredito}
  buscarPorNumeroCredito(numeroCredito: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.apiUrl}/credito/${numeroCredito}`);
  }
}
