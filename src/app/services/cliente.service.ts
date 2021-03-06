import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  cliente: Cliente = new Cliente();
  c: Cliente = new Cliente();

  constructor(private http: HttpClient) {}

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>("https://consult-back.herokuapp.com/cliente");
  }

  public criarCliente(cliente: Cliente): void {
    this.http.post("https://consult-back.herokuapp.com/cliente", cliente).subscribe(resultado => console.log(resultado));
  }

  public alterarCliente(): void {
    this.http.put("https://consult-back.herokuapp.com/cliente", this.cliente).subscribe(resultado => console.log(resultado));
  }

  public deletarCliente(id: number | undefined): void {
    this.http.delete(`https://consult-back.herokuapp.com/cliente/${id}`).subscribe(resultado => console.log(resultado));
  }

  public receberIdCliente(id: number | undefined) {
    this.cliente.id = id;
  }

  public novoCliente(clienteNovo: Cliente) {
    this.cliente.nome = clienteNovo.nome;
    this.cliente.sobrenome = clienteNovo.sobrenome;
    this.cliente.email = clienteNovo.email;

    this.alterarCliente();
  }

  // pesquisar clientes
  public pesquisarClientes(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    
    this.c.nome = term;

    let obs = this.http.post<Cliente[]>("https://consult-back.herokuapp.com/cliente/pesquisa", this.c)
    obs.subscribe(res => {
        console.log(res)
      })
    return obs;
  }
}