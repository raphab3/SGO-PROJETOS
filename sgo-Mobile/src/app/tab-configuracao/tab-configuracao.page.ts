import { AuthService } from './../shared/services/auth.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-configuracao',
  templateUrl: './tab-configuracao.page.html',
  styleUrls: ['./tab-configuracao.page.scss']
})
export class TabConfiguracaoPage implements OnInit {

  usuario: any;

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService) {}


  ngOnInit() {
    this.buscarUsuario();
  }

  buscarUsuario() {
    this.usuarioService.buscar()
    // tslint:disable-next-line:variable-name
    .subscribe(res => {
      this.usuario = res[0];
    });
  }

  sair() {
    this.authService.logout();
  }

}
