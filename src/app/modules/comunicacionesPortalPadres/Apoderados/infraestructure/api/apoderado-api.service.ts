import { RequestListaApoderados } from './../../aplication/dto/request/listaApoderado.request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListaApoderados } from '../../aplication/dto/response/listaApoderado.response';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApoderadoApiService {

  private URL = environment.api


  listaApoderados(req: RequestListaApoderados): Observable<ResponseListaApoderados> {
    return this.http.post<ResponseListaApoderados>(`${this.URL}/Apoderado/Mostrar`, req,{
        headers: { 'Content-Type': 'application/json' },
      });
  }

  constructor(private http: HttpClient) {}

}
