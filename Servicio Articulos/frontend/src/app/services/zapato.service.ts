import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Zapato} from '../models/zapato';

@Injectable({
  providedIn: 'root'
})
export class ZapatoService {

 URL_API = 'http://localhost:4000/api/zapatos'
	selectedZapato: Zapato = {
	marca: '',
	tipo: '',
	talla: 0,
	cantidad: 0,
	precio : 0
	};
	zapatos: Zapato[] = [];

  constructor(private http: HttpClient) {}

	getZapatos(id : string){
	return this.http.get<Zapato[]>(this.URL_API+"/"+id);
	 }

	getZapato(id_zapato : string, id : string){
	return this.http.get<Zapato[]>(this.URL_API+"/"+id_zapato+"/"+id);
	}

	getZapatosByMarca(marca : string, id: string){
	return this.http.get<Zapato[]>(this.URL_API+"/marca/"+marca+"/"+id);
	}

	getZapatosByTalla(talla : string, id : string){
        return this.http.get<Zapato[]>(this.URL_API+"/talla/"+talla+"/"+id);
        }

	getZapatosByTipo(tipo : string,id : string){
        return this.http.get<Zapato[]>(this.URL_API+"/tipo/"+tipo+"/"+id);
        }

	getZapatosByCantidad(cantidad : string,id : string){
        return this.http.get<Zapato[]>(this.URL_API+"/cantidad/"+cantidad+"/"+id);
        }


	createZapato(zapato: Zapato,id : string){
	 return this.http.post(this.URL_API+"/"+id, zapato);
	}

	putZapato(zapato : Zapato,id : string){
		return this.http.put(this.URL_API+"/"+zapato._id+"/"+id,zapato);
	}

	deleteZapato(idZapato: string,idUsuario : string){
	return this.http.delete(this.URL_API+"/"+idZapato+"/"+idUsuario);
	}
}
