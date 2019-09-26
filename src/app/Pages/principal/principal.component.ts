import { Component, OnInit } from '@angular/core';
import { TableEntity } from '../../model/tableEntity';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  arrayListFile: any[]

  constructor() { }

  ngOnInit() {

  }

  fileChanged(e) {
    const file = e.target.files[0];
    if (!file) return

    // Capturar archivo
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onloadend = (e) => {
      this.processFile(fileReader.result);
    };
  }

  processFile(file) {
    //Separar archivo por lineas
    const stringArray = file.split('\n')

    let arrayList = []

    //recorrido de lineas
    stringArray.forEach((line, i) => {
      //separar linea por caracter especificado
      const lineArray = line.split(',')
      if (lineArray.length <= 1) return //discriminar lineas vacías
      let file: any = {}
      lineArray.forEach((element, i) => {
        file = { ...file, ['col' + i]: element } //creacion de objeto por linea
      });
      arrayList = [...arrayList, file]//Agregar objeto a array de lineas
    });


    this.arrayListFile = arrayList;


  }

}
