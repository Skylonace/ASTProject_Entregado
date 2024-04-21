import { Component, OnInit } from '@angular/core';
import { ZapatoService } from '../../services/zapato.service';
import {Zapato} from '../../models/zapato';
import {CommonModule} from '@angular/common';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-zapato',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './zapato.component.html',
  styleUrls: ['./zapato.component.css']
})

export class ZapatoComponent implements OnInit{
	searchOption: string ='';
	searchData: string ='';

	optionsSelect = [
	{ name:"ID", value : 1},
	{ name:"Marca",value: 2},
	{ name:"Talla",value: 3},
	{ name:"Tipo", value:4},
	{ name:"Cantidad", value:5}
	]	

	public constructor(public zapatoService: ZapatoService){}
	
	ngOnInit():void {
		this.getZapatos();
	}

	resetForm(form: NgForm){
		form.reset();
		this.getZapatos();
	}
	
	searchForm(form: NgForm){
		if((this.searchOption == 'ID') && (this.searchData.length == 24)){
			this.zapatoService.getZapato(this.searchData).subscribe(
	                res => {
	                        this.zapatoService.zapatos = res;
	                },
	                err => console.error(err)
			);
		}
		else if(this.searchOption == 'Marca'){
                        this.zapatoService.getZapatosByMarca(this.searchData).subscribe(
                        res => {
                                this.zapatoService.zapatos = res;
                        },
                        err => console.error(err)
                        );
                }
		else if(this.searchOption == 'Talla'){
                        this.zapatoService.getZapatosByTalla(this.searchData).subscribe(
                        res => {
                                this.zapatoService.zapatos = res;
                        },
                        err => console.error(err)
                        );
                }
		else if(this.searchOption == 'Tipo'){
                        this.zapatoService.getZapatosByTipo(this.searchData).subscribe(
                        res => {
                                this.zapatoService.zapatos = res;
                        },
                        err => console.error(err)
                        );
                }
		else if(this.searchOption == 'Cantidad'){
                        this.zapatoService.getZapatosByCantidad(this.searchData).subscribe(
                        res => {
                                this.zapatoService.zapatos = res;
                        },
                        err => console.error(err)
                        );
                }


	}
	
	getZapatos(){
		this.zapatoService.getZapatos().subscribe(
		res => {
			this.zapatoService.zapatos = res;
		},
		err => console.error(err)
		);		
	}

	addZapato(form: NgForm){
		if(form.value._id){
			this.zapatoService.putZapato(form.value).subscribe(
				(res) => {
					this.getZapatos();
					form.reset();
				},
				(err) => console.error(err)
			);
		}
		if(!form.value.marca || !form.value.talla || !form.value.tipo || !form.value.cantidad || !form.value.precio){
			alert("Todos los campos son obligatorios!!");
		}
		else if(form.value.cantidad < 0 || form.value.precio < 0){
			alert("Las cantidades no pueden ser negativas!!");
		}
		else if(!form.value._id){
			this.zapatoService.createZapato(form.value).subscribe(
				(res) => {
					this.getZapatos();
					form.reset();
				},
				(err) => console.error(err)
			);
		}
	}

	deleteZapato(id: any){

		if(confirm('Are you sure to delete it?')){
			this.zapatoService.deleteZapato(id).subscribe(
				(res) => {
					this.getZapatos();
				},
				(err) => console.error(err)
			);
		}	
	}

	editZapato(zapato: Zapato){
		this.zapatoService.selectedZapato = zapato;
	}
}
