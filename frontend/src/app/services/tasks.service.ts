import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Materias } from "../interfaces/materias";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3001/api'

  constructor(private http: HttpClient ) { }


  getTasks(){
    return this.http.get<any>(this.URL + '/tasks')
  }

  getPrivateTasks(): Observable<Materias[]>{
    return this.http.get<Materias[]>(`${this.URL}/materias`)
  }

  createRegistro(materias: Materias){
    return this.http.post<Materias>(`${this.URL}/create-registro`, materias)
  }

  deleteMateria(id: string): Observable<Materias> {
    const url = `${this.URL}/materias/${id}`;
    return this.http.delete<Materias>(url);
  }

  getProfile(){
    return this.http.get<any>(`${this.URL}/profile`)
  }

}
