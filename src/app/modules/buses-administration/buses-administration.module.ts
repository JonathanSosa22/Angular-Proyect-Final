import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import { BusesListComponent } from './buses-list/buses-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BusesDetailComponent } from './buses-detail/buses-detail.component';
import { MatTableModule } from '@angular/material/table';

import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [BusesListComponent, BusesListComponent, BusesDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusesAdministrationRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  exports: [BusesListComponent],
})
export class BusesAdministrationModule {}
