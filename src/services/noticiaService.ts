import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampoPainel } from '../Model/PainelADM';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private http: HttpClient) {}

  readAllItens(): Observable<CampoPainel[]> {
    return this.http.get<CampoPainel[]>(environment.apiBDUrl);
  }

  createItem(item: CampoPainel): Observable<any> {
    return this.http.post(environment.apiBDUrl, item);
  }

  updateItem(item: CampoPainel): Observable<any> {
    return this.http.put(environment.apiBDUrl, item);
  }

  deleteItem(item: CampoPainel): Observable<any> {
    return this.http.request('DELETE', environment.apiBDUrl, {
      body: { id: item.id }
    });
  }

}
