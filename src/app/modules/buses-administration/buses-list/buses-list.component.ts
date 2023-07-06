import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css'],
})
export class BusesListComponent implements OnInit {
  displayedColumns = ['id', 'patente', 'cantidadAsientos', 'model', 'acciones'];
  dataSource = [new Bus(1, 'patente', 22, 2)];
  bus: Bus[] = [];

  constructor(
    private busService: BusService,
    private modelService: ModeloService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.busService.findAll().subscribe((res) => {
      this.dataSource = res.body.map((res) => {
        const bus = new Bus(
          res.id,
          res.patente,
          res.cantidadAsientos,
          res.modeloId
        );
        this.loadModel(bus);
        return bus;
      });
    });
  }

  loadModel(bus: Bus) {
    this.modelService.findOne(bus.modeloId).subscribe((res) => {
      bus.model = res;
    });
  }

  seleccionarBus(bus: Bus) {
    this.router.navigate(['buses', 'detail', bus.id]);
  }

  borrarBus(bus: Bus): void {
    this.busService.borrar(bus.id).subscribe(
      (res) => {
        this.matSnackBar.open('Se borró correctamente el bus', 'Cerrar');
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }

  crearBus() {
    this.router.navigate(['buses', 'create']);
  }
}
