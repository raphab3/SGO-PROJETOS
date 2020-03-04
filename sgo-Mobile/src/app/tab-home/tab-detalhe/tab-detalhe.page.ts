import { ChamadoInterface } from './../../shared/interfaces/Chamado';
import { ChamadoService } from '../../shared/services/ChamadoService.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab-detalhe',
  templateUrl: './tab-detalhe.page.html',
  styleUrls: ['./tab-detalhe.page.scss'],
})
export class TabDetalhePage implements OnInit {

  chamado: ChamadoInterface;
  chamadoId: any;
  confirmacao = false;
  onDetail = false;

  // tslint:disable-next-line:variable-name
  _ultimo_evento: any;
  dataEvento: any;
  respostaEvento: any;

  protocolo: string;

  // #### Apartamento json
  // tslint:disable-next-line:variable-name
  _apartamento: any;
  empreendimento: any;
  bloco: any;
  apartamento: any;

  chamadoAtualizarEvento: ChamadoInterface;
  categoriaProblema: any;

  constructor(
              public navCtrl: NavController,
              public loadingController: LoadingController,
              public route: ActivatedRoute,
              public router: Router,
              private chamadoService: ChamadoService,
              ) { }

  ngOnInit() {
    this.chamadoId = this.route.snapshot.paramMap.get('id');
    this.buscarid(this.chamadoId);
  }

  async buscarid(id) {
    this.chamadoService.buscarId(id).subscribe(response => {
      this.chamado = response;
      console.log(response);

      this.protocolo = this.chamado.protocolo.substring(-1, 6);

      this._ultimo_evento = response.ultimo_evento.split('#$%', 2);
      this.dataEvento = this._ultimo_evento[0];
      this.respostaEvento = this._ultimo_evento[1];

      if (response.apartamento) {
        this._apartamento = response.apartamento.split('-', 3);
        this.apartamento = this._apartamento[0];
        this.bloco = this._apartamento[1];
        this.empreendimento = this._apartamento[2];
      }
      if (this.chamado.novosEventos === true) {
        this.chamadoService.buscarChamado(id)
        .subscribe(data => {
          this.chamadoAtualizarEvento = data;
          // console.log('this.chamadoAtualizarEvento', this.chamadoAtualizarEvento);
          this.chamadoAtualizarEvento.novosEventos = false;
          // if(this.chamadoAtualizarEvento.img == null) {
          //     console.log("this.chamadoAtualizarEvento.img", this.chamadoAtualizarEvento.img)
          //     this.chamadoAtualizarEvento.img = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
          // }

          this.atualizarEvento(id, this.chamadoAtualizarEvento);
        });
      }

    },
      error => {}
    );
  }

  async atualizarEvento(id, chamado) {
    this.chamadoService.atualizarItem(id, chamado)
    .subscribe(data => {
      this.onDetail = true;
      // console.log(data);
    });
  }

  toHome() {
    this.navCtrl.navigateBack(['tabs/tab-home', {onDetail: this.onDetail}]);
  }


}
