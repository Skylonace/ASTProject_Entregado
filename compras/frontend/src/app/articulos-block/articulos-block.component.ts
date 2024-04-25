import { Component, effect, WritableSignal  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompraService } from '../compra.service';
import { Zapato } from '../zapato'

@Component({
  selector: 'app-articulos-block',
  standalone: true,
  imports: [MatTableModule, 
            MatButtonModule, 
            MatCardModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule,
            MatButtonModule,],
  template: `
  <div class="side-by-side">
  <mat-card class="side-form">
  <form
      class="search-articulos-form"
      autocomplete="off"
      [formGroup]="searchArticulosForm"
      (submit)="submitForm()"
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
          <option value="marca">Marca</option>
          <option value="tipo">Tipo</option>
          <option value="talla">Talla</option>
          <option value="id">ID</option>
        </select>
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="searchArticulosForm.invalid"
      >
        Buscar
      </button>
    </form>
  </mat-card>

  <mat-card class="side-table">
    <mat-card-header>
        <mat-card-title>Lista de productos</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="zapatos$()">
          <ng-container matColumnDef="col-marca">
            <th mat-header-cell *matHeaderCellDef>Marca</th>
            <td mat-cell *matCellDef="let element">{{ element.marca }}</td>
          </ng-container>
          <ng-container matColumnDef="col-talla">
            <th mat-header-cell *matHeaderCellDef>Talla</th>
            <td mat-cell *matCellDef="let element">{{ element.talla }}</td>
          </ng-container>
          <ng-container matColumnDef="col-tipo">
            <th mat-header-cell *matHeaderCellDef>Tipo</th>
            <td mat-cell *matCellDef="let element">{{ element.tipo }}</td>
          </ng-container>
          <ng-container matColumnDef="col-precio">
            <th mat-header-cell *matHeaderCellDef>Precio</th>
            <td mat-cell *matCellDef="let element">{{ element.precio }}</td>
          </ng-container>
          <ng-container matColumnDef="col-cantidad">
            <th mat-header-cell *matHeaderCellDef>Cantidad</th>
            <td mat-cell *matCellDef="let element">{{ element.cantidad }}</td>
          </ng-container>
          <ng-container matColumnDef="col-id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{ element._id }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button
              (click)="comprarZapato(element._id || '')">
                Comprar
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
      margin-bottom: 16px;
    }
    .side-form {
      flex: 0 0 360px;
      margin-right: 16px;
    }
    .side-table {
      flex-grow: 2;
    }
    .search-articulos-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    table {
        width: 100%;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `
})
export class ArticulosBlockComponent {

  zapatos$ = {} as WritableSignal<Zapato[]>;

  private fetchZapatos(): void {
    this.zapatos$ = this.compraService.zapatos$;
    this.compraService.getZapatos("SAMPLE_ID");
  }

  comprarZapato(id: string) {

  }

  submitForm() {
    this.zapatos$ = this.compraService.zapatos$;
    this.compraService.searchZapatos("SAMPLE_ID",this.searchBy.value||'', this.search.value||'');
  }

  displayedColumns: string[] = [
    'col-marca',
    'col-talla',
    'col-tipo',
    'col-precio',
    'col-cantidad',
    'col-id',
    'col-action',
  ];

  searchArticulosForm = this.formBuilder.group({
    search: ['', [Validators.required]],
    searchBy: ['id',[Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private compraService: CompraService) {
    effect(() => {
      this.searchArticulosForm.setValue({
        search: '',
        searchBy: 'id',
      });
    });

  }

  get search() {
    return this.searchArticulosForm.get('search')!;
  }

  get searchBy() {
    return this.searchArticulosForm.get('searchBy')!;
  }

}
