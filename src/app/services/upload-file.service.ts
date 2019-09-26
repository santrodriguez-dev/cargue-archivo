import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private url = 'http://localhost:5000/';


  constructor(private http: HttpClient) { }

  /**
   * Obtiene lista de todas las empresas
   */
  updateData(listData) {
    const data = {
      list: listData,
      masterDetail: {
        uuid: this.uuidv4(),
        date: new Date()
      }
    }

    return this.http.post<any>(`${this.url}upload-file`, data)
      .pipe().pipe(take(1));
  }

  //Genera codigo uuid para asociar maestro con detalle
  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
