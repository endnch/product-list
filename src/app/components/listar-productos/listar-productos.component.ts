import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css',
})
export class ListarProductosComponent {
  listProductos: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (data) => {
        this.listProductos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(
      (data) => {
        this.toastr.error(
          'El producto fue eliminado con éxito',
          'Producto Eliminado'
        );
        this.obtenerProductos();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
