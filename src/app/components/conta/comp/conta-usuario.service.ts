import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response.model';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ContaUsuarioService {

  @Output() loginValidado: EventEmitter<string> = new EventEmitter();

  response: Response =  new Response();

  constructor(private http: HttpClient) { }

  public loginUsuario(usuario: Usuario): Observable<Response> {
    let res: Observable<Response> = this.http.post<Response>("http://localhost:8080/login", usuario);
    
    res.subscribe(
      (data: Response) => {
        if (data.status == "erro") {
          this.loginValidado.emit(data.status);
        } else {
          this.loginValidado.emit(data.status);
        }
      }
    )
    return res;
  }

  public cadastroUsuario(novoUsuario: Usuario): void {
    console.log(novoUsuario);
    this.http.post("https://consultoria-api.herokuapp.com/cadastro", novoUsuario).subscribe(resultado => console.log(resultado));    
  }
}
