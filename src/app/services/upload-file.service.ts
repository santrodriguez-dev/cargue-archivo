import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private url = 'http://localhost:5000/';


  constructor(private http: HttpClient) { }

  /**
   * Obtiene lista de todas las empresas
   */
  updateData(products, campaignName) {
    const data = {
      products,
      campaignName
    }

    return this.http.post<any>(`${this.url}product/upload-products`, data).pipe(take(1))
  }

}
