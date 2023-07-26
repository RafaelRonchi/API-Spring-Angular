import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // URL da api
  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  // Método selecionar todos os clientes
  selecionar():Observable <Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  // Metodo para cadastrar clientes 
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

  // Editar
  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj);
  }

  // remover
  remover(id:Number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id)
  }
}
