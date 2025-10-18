import { ResponseGlobal } from "../../../../../../shared/model/responseGlobal.response";
import { ApoderadoModel } from "../apoderado.dto";

export class ResponseListaApoderados extends ResponseGlobal{
  apoderado: ApoderadoModel[] = [];
}
