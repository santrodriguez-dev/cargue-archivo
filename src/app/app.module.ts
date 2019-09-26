import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTableModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent, SeparatorTypeDialog } from './Pages/principal/principal.component';
import { TableComponent } from './components/table/table.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TableComponent,
    SeparatorTypeDialog
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeparatorTypeDialog]
})
export class AppModule { }
