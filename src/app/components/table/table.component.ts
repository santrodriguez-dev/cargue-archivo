import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  _dataSource: any[];
  columnList: any[];
  displayedColumns: string[] = [];

  listFields = [
    { name: 'Nombres', key: 'firstName', columnName: null },
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

    // this.listFields = this.listFields.map(el => {
    //   if (el.columnName === columnName) {
    //     return { name: el.name }
    //   }
    //   return el
    // })

    // this.columnList[0].columnKey = 'tel'

    // setTimeout(() => {
    //   this.columnList = this.columnList.map(item => {
    //     return { ...item, columnKey: 'tel' }
    //   })

    //   console.log(this.columnList);
    // }, 1000);




    // console.log(columnName);




    // this.listFields = this.listFields.map(el => {
    //   if (el.name === valueSelected) {
    //     return { ...el, columnName }
    //   }
    //   return el
    // })
    // console.log(this.listFields);
  }

  getColumns() {
    this.columnList = Object.keys(this._dataSource[0]).map(el => { return { name: el } })

    this.displayedColumns = Object.keys(this._dataSource[0])
  }

  exportList() {

    const dataSourceAddCol = this._dataSource.map(item => {
      let dataModified = {}
      this.columnList.map(field => {
        if (!field.columnKey) return
        dataModified = { ...dataModified, [field.columnKey]: item[field.name] }
      })
      return dataModified
    })

    console.log(dataSourceAddCol);
  }

}
