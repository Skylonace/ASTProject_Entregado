import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from '../../models/usuario';
import {CommonModule} from '@angular/common';
import {FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit{
	searchOption: string ='';
	createUsuario: string = '';
	ID : string  = '';

	auxUsuario : Usuario = {clase : ''};

	optionsSelect1 = [
	{ name:"Admin", value : 1},
	{ name:"Cliente",value: 2}
	]
	
	optionsSelect2 = [
	{ name:"Todos", value : 1},
        { name:"Admin", value : 2},
        { name:"Cliente",value : 3}
        ]



	public constructor(public usuarioService: UsuarioService){}
	
	ngOnInit():void {
		this.getUsuarios();
	}

	resetForm(form: NgForm){
		form.reset();
	}
	
	searchForm(form: NgForm){
		if(!this.ID){
                        alert("El campo ID es obligatorio");
                }
                else if(this.ID.length != 24){
                        alert("El formato del ID no es correcto");
                }
		else if(!this.searchOption){
			alert("Es obligatorio escoger un parametro de busqueda!");
		}else if(this.searchOption == 'Todos'){
			this.getUsuarios();
		}else{

                        this.usuarioService.getUsuariosClase(this.searchOption,this.ID).subscribe(
                        res => {
                                this.usuarioService.usuarios = res;
                        },
                        err => console.error(err)
                        );
              
		}
	}
	
	getUsuarios(){
		this.usuarioService.getUsuarios(this.ID).subscribe(
		res => {
			this.usuarioService.usuarios = res;
		},
		err => console.error(err)
		);		
	}

	addUsuario(form: NgForm){
		if(!this.createUsuario){
			alert("Es obligatorio elegir algun tipo de usuario!");
		}else{
		this.auxUsuario.clase = this.createUsuario;

                        this.usuarioService.createUsuario(this.auxUsuario).subscribe(
                                (res) => {
					alert("Usuario creado con id => "+res._id);
                                },
                                (err) => console.error(err)
				);
		}
        }
 

	deleteUsuario(form: NgForm){
		if(!this.ID){
			alert("El campo ID es obligatorio");
		}
		else if(this.ID.length != 24){
			alert("El formato del ID no es correcto");
		}
		else{	if(confirm('Are you sure to delete it?')){
				this.usuarioService.deleteUsuario(this.ID).subscribe(
					(res) => {
						alert("Usuario borrado con exito !");
						form.reset();
					},
					(err) => console.error(err)
				);
			}
		}
	}

	getUsuarioClase(form: NgForm){
		this.usuarioService.getUsuarioClase(this.ID).subscribe(
                res => {
			this.auxUsuario = res;
                       alert(res._id);
                },
                err => console.error(err)
                );
	}

}
