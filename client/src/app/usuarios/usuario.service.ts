import { Injectable } from '@angular/core';
import { Response, RequestOptions,  Headers,  Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ObterUsuario, AdicionarUsuario, EditarUsuario } from './model/usuario';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsuarioService {

  private UrlService = 'http://localhost:49961/api/Usuario/';

  constructor(private http: Http) { }

  private static parseErrorsModelState(modelState: any): string {
    const errors = [];
    // tslint:disable-next-line:forin
    for (const key in modelState) {
      for (let i = 0; i < modelState[key].length; i++) {
        errors.push(modelState[key][i]);
      }
    }

    return errors.join('<br />');
  }

  adicionarUsuario(usuario: AdicionarUsuario): Observable<any> {
    const response = this.http
      .post(this.UrlService, usuario, this.obterHeader())
      .catch((this.serviceError));

    return response;
  }

  editarUsuario(usuario: EditarUsuario): Observable<any> {
    const response = this.http
      .put(this.UrlService, usuario, this.obterHeader())
      .catch((this.serviceError));

    return response;
  }

  obterUsuario(id: string): Observable<ObterUsuario> {
    return this.http.get(this.UrlService + id)
      .map((res: Response) => this.mapearUsuarioServidorParaCliente(res.json()))
      .catch(this.serviceError);
  }

  obterTodos(): Observable<ObterUsuario[]> {
    return this.http.get(this.UrlService)
      .map((res: Response) => this.mapearListaUsuarioServidorParaCliente(res.json()))
      .catch(this.serviceError);
  }

  excluirUsuario(id: string): Observable<any> {
    const response = this.http
      .delete(this.UrlService + id, this.obterHeader())
      .map((res: Response) => res.json().data || {})
      .catch((this.serviceError));
    return response;
  }

  private mapearListaUsuarioServidorParaCliente(usuarios: any[]): ObterUsuario[] {
    const result: ObterUsuario[] = [];

    for (let i = 0; i < usuarios.length; i++) {
      result.push(this.mapearUsuarioServidorParaCliente(usuarios[i]));
    }
    return result;
  }

  private mapearUsuarioServidorParaCliente(usuario: any): ObterUsuario {
    const us: ObterUsuario = new ObterUsuario();
    us.id = usuario.Id;
    us.nombre = usuario.Nombre;
    us.email = usuario.Email;
    us.pais = usuario.Pais;
    return us;
  }

  private obterHeader(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  private serviceError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = (body.ModelState && UsuarioService.parseErrorsModelState(body.ModelState))
        || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(error);
  }
}
