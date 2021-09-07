import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    console.log(this.usuarioLogin)

    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.id = this.usuarioLogin.id
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto

      console.log(environment.token)
      console.log(environment.id)
      console.log(environment.nome)
      console.log(environment.foto)

      this.router.navigate(['/inicio'])

    }, erro => {
      if(erro.status == 401){
       this.alertas.showAlertDanger('Usuario ou senha inválido!')
      }
    }

    )
  }
}