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

	  getZapatos(){
	return this.http.get<Zapato[]>(this.URL_API);
	 }

	getZapato(id : string){
	return this.http.get<Zapato[]>(this.URL_API+"/"+id);
	}

	getZapatosByMarca(marca : string){
	return this.http.get<Zapato[]>(this.URL_API+"/marca/"+marca);
	}

	getZapatosByTalla(talla : string){
        return this.http.get<Zapato[]>(this.URL_API+"/talla/"+talla);
        }

	getZapatosByTipo(tipo : string){
        return this.http.get<Zapato[]>(this.URL_API+"/tipo/"+tipo);
        }

	getZapatosByCantidad(cantidad : string){
        return this.http.get<Zapato[]>(this.URL_API+"/cantidad/"+cantidad);
        }


	createZapato(zapato: Zapato){
	 return this.http.post(this.URL_API, zapato);
	}

	putZapato(zapato : Zapato){
		return this.http.put(this.URL_API+"/"+zapato._id, zapato);
	}

	deleteZapato(_id: string){
	return this.http.delete(this.URL_API+"/"+_id)
	}
}
