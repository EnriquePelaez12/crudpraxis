import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,  
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../model/LoginModel';
import { ComsumeServicioService } from '../services/comsume-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isSubmit = false;
  User: Array<Usuario> = [];
  constructor(
    private comsumeServicio: ComsumeServicioService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastController
  ) {
    this.UsuariosLocal();
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
          ),
        ],
      ],
      contrasena: [
        '',
        [
          Validators.required,
          this.validatePassword,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,10}'
          ),
        ],
      ],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  login() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      return;
    } else {
      var usuario = this.form.value;
      console.log(usuario);
      this.AuthUsuario(usuario);
    }
  }

  AuthUsuario(user) {
    var data = JSON.parse(JSON.stringify(user));
    var object = this.User;
    var estatusLogin: boolean = false;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (JSON.stringify(element) === JSON.stringify(data)) {
          estatusLogin = true;
        }
      }
    }
    if (estatusLogin) {
      this.router.navigate(['home']);
    } else {
      this.Msgs('Correo y/o Password incorrecos', 'danger');
      this.LimpiarForm();
    }
  }

  btnRegistrarse() {
    this.router.navigate(['registrar']);
  }

  UsuariosLocal(): Usuario[] {
    var Usuarios = [
      {
        correo: 'enrique@gmail.com',
        contrasena: '4dm1N_1',
      },
      { correo: 'praxis@gmail.com', contrasena: '4dm1N_02' },
    ];
    return (this.User = Usuarios);
  }

  async Msgs(msg, status) {
    //funcion para mostrar los mensajes de alertas
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  LimpiarForm() {
    this.isSubmit = false;

    this.form = this.formBuilder.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
          ),
        ],
      ],
      contrasena: [
        '',
        [
          Validators.required,
          this.validatePassword,
          Validators.minLength(6),
          Validators.maxLength(10),
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,10}'
          ),
        ],
      ],
    });
  }

  private validatePassword(control) {
    const password = control.value;
    let error = null;
    if (
      password.includes('$') ||
      password.includes('!') ||
      password.includes('"') ||
      password.includes('#') ||
      password.includes('%') ||
      password.includes('&') ||
      password.includes('/') ||
      password.includes('(') ||
      password.includes(')') ||
      password.includes('=') ||
      password.includes('?') ||
      password.includes('¡') ||
      password.includes('*') ||
      password.includes('*') ||
      password.includes('~') ||
      password.includes('+') ||
      password.includes('[') ||
      password.includes(']') ||
      password.includes('}') ||
      password.includes('{') ||
      password.includes(';') ||
      password.includes(',') ||
      password.includes(':') ||
      password.includes('-') ||
      password.includes(';') ||
      password.includes('``') ||
      password.includes('|') ||
      password.includes('°') ||
      password.includes('¬') ||
      password.includes("'") ||
      password.includes('¿') ||
      password.includes('´´')
    ) {
      error = { ...error, punto: ' Error punto' };
    }
    return error;
  }
}


