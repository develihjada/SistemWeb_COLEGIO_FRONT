import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RequestTipoDocumento } from '../../models/request/listaTipoDocumento.request';
import { Observable } from 'rxjs';
import { ResponseTipoDocumento } from '../../models/response/listaTipoDocumento.response';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  private readonly URL  = environment.api
  private httpCliente = inject(HttpClient)

  public ListarTipoDocumentos(req: RequestTipoDocumento): Observable<ResponseTipoDocumento> {
    return this.httpCliente.post<ResponseTipoDocumento>(
      `${this.URL}/tipoDocumento/mostrar`,req,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
