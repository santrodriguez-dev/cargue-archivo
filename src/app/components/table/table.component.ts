import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { FieldShow } from 'src/app/model/FieldEntity';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private uploadFileService: UploadFileService, private _snackBar: MatSnackBar) { }

  _dataSource: any[];
  columnList: any[];
  isLoading = false;
  displayedColumns: string[] = [];
  @Output() resetFile = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() showbuttonSave: boolean

  listFields: FieldShow[] = [
    { name: 'Nombres', key: 'firstName' },
    { name: 'Apellidos', key: 'lastName' },
    { name: 'Teléfonos', key: 'telephone' },
    { name: 'Direcciones', key: 'address' }
  ]

  @Input() set dataSource(dataSource: any[]) {
    this._dataSource = dataSource;
    this.getColumns()
  }

  get dataSource(): any[] {
    // console.log('Get', this._dataSource)
    return this._dataSource;
  }

  onSelectionChange(valueSelected, column) {
    console.log(this.columnList);

  }

  /**
   * Extrae columnas necesarias para pintar tabla
   */
  getColumns() {
    this.columnList = Object.keys(this._dataSource[0]).map(el => { return { name: el } })
    // this.displayedColumns = Object.keys(this._dataSource[0])
    this.displayedColumns = ['No', ...Object.keys(this._dataSource[0])]



    //Asignacion inicial por defecto
    this.columnList = this.columnList.map((item, i) => {
      if (!this.listFields[i]) return item
      return { ...item, columnKey: this.listFields[i].key }
    });
    console.log(this.columnList);
  }
  /**
   * Normaliza arreglo con la estructura para guardar en base de datos
   */
  exportList() {

    //Validacion para escoger al menos una columna
    const itemFind = this.columnList.find(item => item.columnKey)
    if (!itemFind) {
      this._snackBar.open('Debes seleccionar al menos una columa', 'alerta', {
        duration: 5000,
      });
      return
    }

    //Transformacion de listado con claves especificadas
    const dataSourceAddCol = this._dataSource.map(item => {
      let dataModified = {}
      this.columnList.map(field => {
        if (!field.columnKey) return
        dataModified = { ...dataModified, [field.columnKey]: item[field.name] }
      })
      return dataModified
    })

    //Envio de datos al servicio
    this.isLoading = true
    this.uploadFileService.updateData(dataSourceAddCol, 'Nueva Campaña')
      .pipe(catchError(err => {
        this.isLoading = false
        console.error(err.error);
        this._snackBar.open(err.error, 'error', {
          duration: 5000,
        });
        return err
      }))
      .subscribe(data => {
        this.isLoading = false
        if (!data) {
          this._snackBar.open('No se ha podido almacenar la información', 'error', {
            duration: 5000,
          });
          return
        }
        this._snackBar.open('La información se ha guardado exitosamente', 'Exito', {
          duration: 5000,
        });
        this.resetFile.emit(data)
      });
  }

}
