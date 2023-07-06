import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip';
import { TripService } from '../../../services/trip.service';
import { ModeloService } from '../../../services/modelo.service';
import { BusService } from '../../../services/bus.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip.ts-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  displayedColumns = [
    'id',
    'origen',
    'destino',
    'fechaLlegada',
    'fechaSalida',
    'colectivo',
    'acciones',
  ];
  dataSource = [
    new Trip(1, 'Viedma', 'Patagones', '2023-06-29', '2023-06-29', 1),
  ];

  constructor(
    private tripService: TripService,
    private busService: BusService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.tripService.findAll().subscribe((res) => {
      this.dataSource = res.body.map((res) => {
        const trip = new Trip(
          res.id,
          res.lugarDestino,
          res.lugarSalida,
          res.fechaLlegada,
          res.fechaSalida,
          res.idColectivo
        );
        this.loadColectivo(trip);
        return trip;
      });
    });
  }

  loadColectivo(trip: Trip) {
    this.busService.findOne(trip.idColectivo).subscribe((res) => {
      trip.colectivo = res;
    });
  }

  editarTrip(trip) {
    this.router.navigate(['trips', 'detail', trip.id]);
  }

  borrarTrip(trip: Trip): void {
    this.tripService.borrar(trip.id).subscribe(
      (res) => {
        this.matSnackBar.open('Se borró correctamente el viaje', 'Cerrar');
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
      }
    );
  }

  crearViaje() {
    this.router.navigate(['trips', 'create']);
  }
}
