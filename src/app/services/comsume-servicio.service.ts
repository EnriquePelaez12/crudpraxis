import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../model/TodoModel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComsumeServicioService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  newItems: Array<Datos> = [];
  error: string;
  private _deslugar = new Subject<Datos>();


  constructor(private http: HttpClient) {}

  getDatosServicio(): Datos[] {
    this.http.get<any>(this.url).subscribe(
      (request) => {
        let length0fObject = 0;
        for (let i of request) {
          length0fObject++;
          if (i.id <= 20) {
            this.newItems.push(i);
          }
        }
        
        localStorage.setItem('Lista', JSON.stringify(this.newItems));
      },
      (error) => (this.error = error)
    );

    return this.newItems;
    
  }

  addUser(user: Datos) {
    user.id = this.newItems.length + 1;
    user.userId = 1;
    this.newItems.push(user);
    this.UpdateLocalStorange();
  }

  updateDato(user: Datos) {
    const index = this.newItems.findIndex((u) => user.id === u.id);
    this.newItems[index] = user;
    this.UpdateLocalStorange();
  }
  deleteDato(user: Datos) {
    this.newItems.splice(this.newItems.indexOf(user), 1);
    this.UpdateLocalStorange();
  }

  UpdateLocalStorange() {
    localStorage.setItem('Lista', JSON.stringify(this.newItems));
  }
}
