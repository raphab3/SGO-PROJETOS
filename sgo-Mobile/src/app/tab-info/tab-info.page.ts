import { AuthService } from './../shared/services/auth.service';
import { EmpresaService } from './empresa.service';
import { Component, OnInit } from '@angular/core';
import { EmpresaData } from './empresaData';

@Component({
  selector: 'app-tab-info',
  templateUrl: './tab-info.page.html',
  styleUrls: ['./tab-info.page.scss'],
})
export class TabInfoPage implements OnInit {

  empresa: EmpresaData;
  cidadeEstado: string;
  constructor(private empresaService: EmpresaService,
              private authService: AuthService) { }

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.empresaService.buscarEmpresa()
    .subscribe(data => {
      this.empresa = data[0];
      this.cidadeEstado = this.empresa.cidade + '-' + this.empresa.estado;
    });
  }

  sair() {
    this.authService.logout();
  }

}
