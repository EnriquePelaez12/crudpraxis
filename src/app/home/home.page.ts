import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComsumeServicioService } from '../services/comsume-servicio.service';
import { Datos } from 'src/app/model/TodoModel';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listDatos: Datos[];
  newUser: any = {};
  public editUserForm: boolean;
  editedUser: any = {};

  constructor(
    private comsumeServicio: ComsumeServicioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listDatos = this.getTodo();
  }

  getTodo(): Datos[] {
    return this.comsumeServicio.getDatosServicio();
  }

  showFormEdit(user: Datos) {
    var completed;
    user.completed? completed = "0" : completed = "1"
      this.router.navigate([
        '/add/',
        user.userId,
        user.id,
        user.title,
        completed ,
      ]); 
  }
  add() {
    this.router.navigate(['/add/', 0, 0, 0, 0]); 
  }

  removeDato(user: Datos) {
    this.comsumeServicio.deleteDato(user);
  }

}
