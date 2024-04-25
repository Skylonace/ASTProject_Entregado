import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from './compra'
import { Zapato } from './zapato';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private url = 'http://localhost:4700';

  constructor(private httpClient: HttpClient) { }
  
  compras$ = signal<Compra[]>([]);
  zapatos$ = signal<Zapato[]>([]);

  getZapatos(id: string) {
    this.httpClient.get<Zapato[]>(`${this.url}/zapatos/${id}`)
    .subscribe(zapatos => {
      this.zapatos$.set(zapatos);
    });
    return this.zapatos$();
  }

  searchZapatos(id: string, param: string, value: string) {
    this.httpClient.get<Zapato[]>(`${this.url}/zapatos/${id}/${param}/${value}`)
    .subscribe(zapatos => {
      this.zapatos$.set(zapatos);
      return this.zapatos$();
    });
  }

  getCompras(id: string) {
    this.httpClient.get<Compra[]>(`${this.url}/compras/${id}`)
    .subscribe(compras => {
      this.compras$.set(compras);
    });
  }

  searchCompras(id: string, param: string, value: string) {
    this.httpClient.get<Compra[]>(`${this.url}/compras/${id}/${param}/${value}`)
    .subscribe(compras => {
      this.compras$.set(compras);
    });
  }

  getCompra(id: string, idCompra: string) {
    return this.httpClient.get<Compra>(`${this.url}/compras/${id}/${idCompra}`)
  }

  createCompra(id: string, compra: Compra) {
    return this.httpClient.post(`${this.url}/compras/${id}`, compra, { responseType: 'text' })
  }

  updateCompra(id: string, idCompra: string, compra: Compra) {
    return this.httpClient.put(`${this.url}/compras/${id}/${idCompra}`, compra, { responseType: 'text' })
  }

  deleteCompra(id: string, idCompra: string) {
    return this.httpClient.delete(`${this.url}/compras/${id}/${idCompra}`, { responseType: 'text' })
  }
  
}
