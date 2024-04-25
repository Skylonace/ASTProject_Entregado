import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 URL_API = 'http://localhost:4100/api/usuarios'
	selectedUsuario: Usuario = {
	clase: '',
	};
	usuarios: Usuario[] = [];

  constructor(private http: HttpClient) {}

	getUsuarios(id : string){
	return this.http.get<Usuario[]>(this.URL_API+"/"+id);
	}

	getUsuario(id : string){
	return this.http.get<Usuario[]>(this.URL_API+"/"+id);
	}
	
	getUsuarioClase(id : string){
	
	return this.http.get<Usuario>(this.URL_API+"/clase/"+id); 
	}

	getUsuariosClase(clase : string,id : string){
	return this.http.get<Usuario[]>(this.URL_API+"/claseAll/"+clase+"/"+id);
	}

	createUsuario(usuario: Usuario){
	return this.http.post<Usuario>(this.URL_API, usuario);
	}

	deleteUsuario(id: string){
	return this.http.delete(this.URL_API+"/"+id)
	}
}
