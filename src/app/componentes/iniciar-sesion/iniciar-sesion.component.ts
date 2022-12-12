import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario! : LoginUsuario;
  nombreUsuario! : string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  // form!: FormGroup;

  constructor(private tokenService: TokenService,  private authService: AuthService, private router: Router) {
  //constructor(private formBuilder: FormBuilder, private autenticacionService: AutenticacionService, private ruta: Router ) {
    // this.form = this.formBuilder.group(
    //   {
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(8)]],
    //     deviceInfo: this.formBuilder.group(
    //       {
    //         deviceId: ["17867868768"],
    //         deviceType: ["DEVICE_TYPE_ANDROID"],
    //         notificationToken: ["67657575eececc34"]
    //       }
    //     )
    //   }
    // )

  }



  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password)
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate([''])
    }, err => {
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
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
