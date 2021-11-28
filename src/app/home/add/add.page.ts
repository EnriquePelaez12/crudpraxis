import { Component,OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Datos } from 'src/app/model/TodoModel'; 
import { ComsumeServicioService } from 'src/app/services/comsume-servicio.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  users: Datos[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};
  form:FormGroup;
  isSubmit = false;


  constructor(
    private comsumeServicio: ComsumeServicioService,
    private router: Router,
    private formAdd: FormBuilder,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
  let id        = this.route.snapshot.params['id']; 
  let userId    = this.route.snapshot.params['userId']; 
  let title     = this.route.snapshot.params['title']; 
  let completed = this.route.snapshot.params['completed']; 

  let parametros = [{"id":id,"userId":userId,"title":title,"completed":completed}]
  this.inicializarFormulario(parametros[0]);
  }

  inicializarFormulario(parametros){
    if (parametros.title === '0') {
      this.isNewUser = true;
      this.form = this.formAdd.group({
        title: [null, [Validators.required]],
        completed: [false],
      });      
      
    } else {
      this.isNewUser = false;
      this.form = this.formAdd.group({
        title:     [parametros.title, [Validators.required]],
        completed: [parametros.completed === "1" ? false : true],
        userId:    [parametros.userId],
        id:        [Number(parametros.id)]  
      });
    }    
  }

  get errorControl() {
    return this.form.controls;
  }


  btnSubmit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID' ) {
      return;
    }else{
        let datoForm: Datos
        datoForm = this.form.value
      if (this.isNewUser) { 
        this.comsumeServicio.addUser(datoForm);
        this.userForm = false;
        this.newUser = {};
        this.router.navigate(['home']);
        
      } else {
        this.updateDato(datoForm);
      }     
    }   
  }

  updateDato(datoForm) {
    this.comsumeServicio.updateDato(datoForm);
    this.editUserForm = false;
    this.editedUser = {};
    this.router.navigate(['home']);
  }


  btnCancel() {
    this.newUser = {};
    this.userForm = false;
    this.router.navigate(['home']);
  }

}
