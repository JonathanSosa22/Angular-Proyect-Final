import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  resourceUrl = environment.backendUrl + 'viajes';

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un error');
      })
    );
  }

  crearTrip(trip: TripDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, trip).pipe(
      catchError((err) => {
        console.log('Ocurrio un error: ');
        console.log(err);
        return throwError(() => 'No se pudo crear el viaje');
      })
    );
  }

  actualizarTrip(bus: TripDTO): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + bus.id, bus).pipe(
      catchError((err) => {
        console.log('Ocurrio un error: ');
        console.log(err);
        return throwError(() => 'No existe el bus');
      })
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(this.resourceUrl + '/' + id, { observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log('Ocurrio un error: ');
          console.log(err);
          return throwError(() => 'No existe');
        })
      );
  }
}

export interface TripDTO {
  id: number;
  lugarSalida: string;
  lugarDestino: string;
  fechaLlegada: Date;
  fechaSalida: Date;
  personaId: number[];
  idColectivo: number;
}