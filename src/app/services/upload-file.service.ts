import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private url = '';


  constructor(private http: HttpClient) { }

  /**
   * Obtiene lista de todas las empresas
   */
  updateData(data) {
    return this.http.get<any>(`${this.url}Company/GetAll`)
      .pipe().pipe(take(1));
  }

}
