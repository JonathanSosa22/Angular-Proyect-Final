import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusDTO, BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-buses-detail',
  templateUrl: './buses-detail.component.html',
  styleUrls: ['./buses-detail.component.css'],
})
export class BusesDetailComponent implements OnInit {
  selectedBus: Bus | null = null;
  patenteControl = new FormControl('', [Validators.required]);
  cantidadAsientosControl = new FormControl('', [Validators.required]);

  busForm: FormGroup = this.fb.group({
    patente: ['', Validators.required],
    cantidadAsientos: [
      0,
      [Validators.required, Validators.min(0), Validators.max(101)],
    ],
    modeloId: [
      0,
      [Validators.required, Validators.min(0), Validators.max(101)],
    ],
  });

  constructor(
    private busService: BusService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _location: Location,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('El id que estoy editando es: ' + id);
      if (id) {
        this.findBus(Number(id));
      }
    });
  }

  findBus(id: number) {
    this.busService.findOne(id).subscribe(
      (res) => {
        if (res) {
          this.selectedBus = new Bus(
            res.id,
            res.patente,
            res.cantidadAsientos,
            res.modeloId
          );

          this.busForm.patchValue({
            patente: this.selectedBus.patente,
            cantidadAsientos: this.selectedBus.cantidadAsientos,
          });
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar');
        this.router.navigate(['buses', 'list']);
      }
    );
  }

  guardarCambios() {
    const body: BusDTO = {
      id: null,
      patente: this.busForm.get('patente').value,
      cantidadAsientos: this.busForm.get('cantidadAsientos').value,
      modeloId: this.busForm.get('modeloId').value,
    };

    if (this.selectedBus && this.selectedBus.id) {
      console.log('Actualizando un bus');

      body.id = this.selectedBus.id;

      this.busService.actualizarBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se guardaron los cambios del bus', 'Cerrar');
          this.router.navigate(['buses', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    } else {
      this.busService.crearBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Se creo el bus correctamente', 'Cerrar');
          this.router.navigate(['buses', 'list']);
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar');
        }
      );
    }
  }

  volverAtras() {
    this.router.navigate(['buses', 'list']);
  }
}
