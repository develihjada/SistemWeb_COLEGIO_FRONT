import { ResponseGlobal } from "../../../../../shared/model/responseGlobal.response";
import { TipoDocumentomModel } from "../tipoDocumento.model";

export class ResponseTipoDocumento extends ResponseGlobal {
  tipoDocumento: TipoDocumentomModel[] = []
}
