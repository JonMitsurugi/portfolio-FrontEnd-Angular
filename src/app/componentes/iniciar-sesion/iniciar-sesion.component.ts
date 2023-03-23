import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  isSubmitting = false;
  buttonText = 'Ingresar';
  form: FormGroup;

  isLogged = false;
  isLogginFail = false;
  loginUsuario! : LoginUsuario;
  nombreUsuario! : string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;



  constructor(private tokenService: TokenService,  private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

  }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
        nombreUsuario: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    if (!this.form.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.buttonText = ' Enviando...';

    this.loginUsuario = this.form.value;
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate([''])
    }, err => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.isLogged = false;
      this.isLogginFail = true;
      this.errMsj = err.error.mensaje;
      console.log(this.loginUsuario);
      console.log(this.errMsj);

      })
  }


   // get Email() {
  //   return this.form.get('email');
  // }

  //  get Password() {
  //   return this.form.get('password');
  // }


  /*onEnviar(event: Event) {
    event.preventDefault();
    this.autenticacionService.iniciarSesion(this.form.value).subscribe(data => { console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/porfolio']);
    })
  }*/

  // variable
  show_button: Boolean = false;
  show_eye: Boolean = false;

//Function
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }


}
