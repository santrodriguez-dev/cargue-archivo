import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { FieldShow } from 'src/app/model/FieldEntity';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private uploadFileService: UploadFileService, private _snackBar: MatSnackBar) { }

  _dataSource: any[];
  columnList: any[];
  displayedColumns: string[] = [];
  @Output() resetFile = new EventEmitter();

  listFields: FieldShow[] = [
    { name: 'Nombres', key: 'firstName' },
    { name: 'Apellidos', key: 'lastName' },
    { name: 'Teléfonos', key: 'tel' },
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
  }

  /**
   * Extrae columnas necesarias para pintar tabla
   */
  getColumns() {
    this.columnList = Object.keys(this._dataSource[0]).map(el => { return { name: el } })
    this.displayedColumns = Object.keys(this._dataSource[0])
  }

  /**
   * Normaliza arreglo con la estructura para guardar en base de datos
   */
  exportList() {

    const itemFind = this.columnList.find(item => item.columnKey)
    if (!itemFind) {
      this._snackBar.open('Debes seleccionar al menos una columa', 'alerta', {
        duration: 5000,
      });
      return
    }



    const dataSourceAddCol = this._dataSource.map(item => {
      let dataModified = {}
      this.columnList.map(field => {
        if (!field.columnKey) return
        dataModified = { ...dataModified, [field.columnKey]: item[field.name] }
      })
      return dataModified
    })

    this.uploadFileService.updateData(dataSourceAddCol).subscribe(data => {
      if (!data) {
        this._snackBar.open('No se ha podido almacenar la información', 'error', {
          duration: 5000,
        });
        return
      }
      this._snackBar.open('La información se ha guardado exitosamente', 'alerta', {
        duration: 5000,
      });
      this.resetFile.emit()
    });
  }

}
