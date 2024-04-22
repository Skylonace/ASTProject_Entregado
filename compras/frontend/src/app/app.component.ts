import { Component, ComponentRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComprasBlockComponent } from './compras-block/compras-block.component'
import { ArticulosBlockComponent } from './articulos-block/articulos-block.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, ComprasBlockComponent, ArticulosBlockComponent],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
        flex-direction: column;
      }
      .fill-remaining-space {
        flex: 1 1 auto;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      Compras
    </mat-toolbar>
    <main>
      <app-articulos-block/>
      <app-compras-block/>
    </main>
  `,
})

export class AppComponent {
  
}
