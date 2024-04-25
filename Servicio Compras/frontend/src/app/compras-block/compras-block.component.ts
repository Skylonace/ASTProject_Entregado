import { Component, effect, EventEmitter, input, Output, OnInit, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CompraService } from '../compra.service';
import { SharedService } from '../shared.service'
import { Compra } from '../compra';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-compras-block',
  standalone: true,
  imports: [MatTableModule, 
            MatButtonModule, 
            MatCardModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule,
            MatButtonModule,
            MatDividerModule,
            FormsModule
            ],
  template: `
  <div class="side-by-side">
  <mat-card class="side-form">
  <form>
      <mat-form-field>
        <mat-label>ID Usuario</mat-label>
        <input type="text" matInput [formControl]="userId">
        @if (!userId.valid) {
          <mat-error>Introduce un ID válido</mat-error>
        }
      </mat-form-field>
    </form>
  <mat-divider></mat-divider>    
  <form
      class="compras-forms"
      autocomplete="off"
      [formGroup]="nuevaCompraForm"
      (submit)="submitCompraForm()"
    >
      <input formControlName='id' value="" hidden/>
      <mat-form-field>
        <mat-label>ID Artículo</mat-label>
        <input matInput placeholder="ID Artículo" formControlName="idArticulo" required />
        @if (id.invalid) {
        <mat-error>ID inválido</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Cantidad</mat-label>
        <input matInput placeholder="Cantidad" formControlName="cantidad" required />
        @if (cantidad.invalid) {
        <mat-error>Cantidad no válida</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Nombre</mat-label>
        <input matInput placeholder="Nombre" formControlName="nombre" required />
        @if (nombre.invalid) {
        <mat-error>El campo no puede estar vacío</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Direccion</mat-label>
        <input matInput placeholder="Direccion" formControlName="direccion" required />
        @if (direccion.invalid) {
        <mat-error>El campo no puede estar vacío</mat-error>
        }
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="nuevaCompraForm.invalid"
      >
        Enviar
      </button>
    </form>
    <button
        mat-raised-button
        color="primary"
        (click)="clear()"
      >
        Limpiar
      </button>
  <mat-divider></mat-divider>
  <form
      class="compras-forms"
      autocomplete="off"
      [formGroup]="searchComprasForm"
      (submit)="submitBusquedaForm()"
    >
      <mat-form-field>
        <mat-label>Buscar</mat-label>
        <input matInput placeholder="Buscar" formControlName="search" required />
        @if (search.invalid) {
        <mat-error>El campo no puede estar vacío</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Buscar por</mat-label>
        <select matNativeControl formControlName="searchBy" required>
          <option value="id_articulo">ID Articulo</option>
          <option value="nombre">Nombre</option>
          <option value="direccion">Dirección</option>
          <option value="id">ID</option>
        </select>
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="searchComprasForm.invalid"
      >
        Buscar
      </button>
      <br />
    </form>
    <button
        mat-raised-button
        color="primary"
        (click)="buscarTodos()"
      >
        Buscar Todas
      </button>
  </mat-card>

  <mat-card class="side-table">
    <mat-card-header>
        <mat-card-title>Lista de compras</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="compras$()">
          <ng-container matColumnDef="col-id-articulo">
            <th mat-header-cell *matHeaderCellDef>ID Artículo</th>
            <td mat-cell *matCellDef="let element">{{ element.id_articulo }}</td>
          </ng-container>
          <ng-container matColumnDef="col-id-cliente">
            <th mat-header-cell *matHeaderCellDef>ID Cliente</th>
            <td mat-cell *matCellDef="let element">{{ element.id_cliente }}</td>
          </ng-container>
          <ng-container matColumnDef="col-cantidad">
            <th mat-header-cell *matHeaderCellDef>Cantidad</th>
            <td mat-cell *matCellDef="let element">{{ element.cantidad }}</td>
          </ng-container>
          <ng-container matColumnDef="col-nombre">
            <th mat-header-cell *matHeaderCellDef>Nombre</th>
            <td mat-cell *matCellDef="let element">{{ element.nombre }}</td>
          </ng-container>
          <ng-container matColumnDef="col-direccion">
            <th mat-header-cell *matHeaderCellDef>Direccion</th>
            <td mat-cell *matCellDef="let element">{{ element.direccion }}</td>
          </ng-container>
          <ng-container matColumnDef="col-id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{ element._id }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button
              (click)="editarCompra(element._id || '')">
                Editar
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="borrarCompra(element._id || '')"
              >
                Borrar
              </button>
            </td>
          </ng-container>

          
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: `
    .side-by-side {
      display: flex;
      flex-direction: row;
    }
    .side-form {
      flex: 0 0 360px;
      margin-right: 16px;
      display: flex;
      flex-direction: column;
    }
    .side-table {
      flex-grow: 2;
    }
    .compras-forms {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    table {
        width: 100%;
        button:first-of-type {
          margin-right: 1rem;
        }
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `
})
export class ComprasBlockComponent implements OnInit{

  compras$ = {} as WritableSignal<Compra[]>;

  buscarTodos() {
    this.compras$ = this.comprasService.compras$;
    this.comprasService.getCompras(this.userId.value || '');
  }

  setProduct(id: string) {
    this.nuevaCompraForm.controls['idArticulo'].setValue(id);
  }

  ngOnInit() {
    this.compras$ = this.comprasService.compras$;
    this.sharedService.idProductMessage.subscribe(
      (id) => {this.setProduct(id);}
    );
    this.userId.valueChanges.subscribe(
      (value) => {
        this.sharedService.setUserId(value || '');
      }
    )
  }
  
  submitCompraForm() {
    const nuevaCompra: Compra = {
      id_articulo: this.idArticulo.value || '',
      id_cliente: this.userId.value || '',
      cantidad: parseInt(this.cantidad.value || '0'),
      nombre: this.nombre.value || '',
      direccion: this.direccion.value || '',
    };
    if(this.id.value != '') {
      this.comprasService.updateCompra(nuevaCompra.id_cliente, this.id.value || '', nuevaCompra).subscribe((res) => {
        this.buscarTodos();
        this.clear();
      });
    } else {
      this.comprasService.createCompra(nuevaCompra.id_cliente, nuevaCompra).subscribe((res) => {
        this.buscarTodos();
        this.clear();
      });
    }
  }

  submitBusquedaForm() {
    this.compras$ = this.comprasService.compras$;
    this.comprasService.searchCompras(this.userId.value || '', this.searchBy.value || '',this.search.value || '');
  }

  borrarCompra(idCompra: string) {
    this.comprasService.deleteCompra(this.userId.value || '', idCompra).subscribe((res) => {
      this.buscarTodos();
    });
  }

  editarCompra(idCompra: string) {
    this.comprasService.getCompra(this.userId.value || '', idCompra).subscribe( res => {
      this.userId.setValue(res.id_cliente || '');
      const cantidad = res.cantidad.toString();
      this.nuevaCompraForm.setValue({id: res._id || '',
                                  idArticulo: res.id_articulo || '', 
                                  cantidad: cantidad || '', 
                                  nombre: res.nombre || '', 
                                  direccion: res.direccion || ''})
    });
    this.userId.disable();
    this.nuevaCompraForm.controls['cantidad'].disable();
    this.nuevaCompraForm.controls['idArticulo'].disable();
  }

  displayedColumns: string[] = [
    'col-id-articulo',
    'col-id-cliente',
    'col-cantidad',
    'col-nombre',
    'col-direccion',
    'col-id',
    'col-action',
  ];

  userId = new FormControl('', [Validators.required, Validators.minLength(24), Validators.maxLength(24)]);

  searchComprasForm = this.formBuilder.group({
    search: ['', [Validators.required]],
    searchBy: ['id',[Validators.required]],
  });

  nuevaCompraForm = this.formBuilder.group({
    id: ['',[]],
    idArticulo: ['',[Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
    cantidad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre: ['',[Validators.required]],
    direccion: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder,
              private comprasService:CompraService,
              private sharedService: SharedService) {
    effect(() => {
      this.searchComprasForm.setValue({
        search: '',
        searchBy: 'id',
      });
    });

  }

  clear() {
    this.nuevaCompraForm.setValue({id: '',
                                  idArticulo: '',
                                  cantidad: '',
                                  nombre: '',
                                  direccion: ''}
    )
    this.nuevaCompraForm.controls['cantidad'].enable();
    this.nuevaCompraForm.controls['idArticulo'].enable();
    this.userId.enable();
  }

  get search() {
    return this.searchComprasForm.get('search')!;
  }
  get searchBy() {
    return this.searchComprasForm.get('searchBy')!;
  }
  get id() {
    return this.nuevaCompraForm.get('id')!;
  }
  get idArticulo() {
    return this.nuevaCompraForm.get('idArticulo')!;
  }
  get cantidad() {
    return this.nuevaCompraForm.get('cantidad')!;
  }
  get nombre() {
    return this.nuevaCompraForm.get('nombre')!;
  }
  get direccion() {
    return this.nuevaCompraForm.get('direccion')!;
  }


}