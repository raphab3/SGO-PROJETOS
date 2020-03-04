import { ChamadoInterface } from './../shared/interfaces/Chamado';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ChamadoService } from '../shared/services/ChamadoService.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss']
})
export class TabHomePage implements OnInit {

  chamados: ChamadoInterface[] = [];

  totalChamados: number;
  confirmacao = 'false';
  onDetail = 'false';
  filtro = '';
  filtroBadge = '';
  searchTerm = '';
  feedbackUsuario = 0;
  meuFeedback = 0;


  chamado: ChamadoInterface;
  novosEventos: boolean;
  newData = new Date().toISOString().slice(0, 10);
  chamadofeed: ChamadoInterface;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public toastController: ToastController,
              public route: ActivatedRoute,
              public router: Router,
              private authService: AuthService,
              public modalController: ModalController,
              private chamadoService: ChamadoService) {
                  this.buscarFiltro(this.filtro);
              }

  async ngOnInit() {
    this.escutaCadastro();
  }

  doRefresh(event) {
    this.buscarFiltro(this.filtro);

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async buscarFiltro(filtro: any) {
    this.chamadoService.buscar(filtro)
      .subscribe(response => {
      this.chamados = response;
      this.totalChamados = response.length;
      }, error => {
        });
    }

  async pesquisar() {
    this.buscarFiltro(this.searchTerm);
    this.filtroBadge = '';
  }

  async segmentChanged(ev: any) {
    this.filtro = ev.detail.value;
    this.filtroBadge = this.filtro;
    this.buscarFiltro(this.filtro);
  }

  async verificarNovosEventos() {

  }

  async escutaCadastro() {
    this.confirmacao = this.route.snapshot.paramMap.get('confirmacao');
    if (this.confirmacao === 'true') {
        this.buscarFiltro(this.filtro),
        // console.log(this.confirmacao);
        this.confirmacao = 'false';
    }
  }

  async vizualizouDetalhe() {
    this.onDetail = this.route.snapshot.paramMap.get('onDetail');
    if (this.onDetail === 'true') {
        this.buscarFiltro(this.filtro),
        this.onDetail = 'false';
    }
  }

  // capturar range do feedback
  capturarFeedback(ev) {
    this.meuFeedback = ev.detail.value;
  }

  // pegar o id do chamado
  selecionarChamado(id) {
    this.chamadoService.buscarChamado(id)
    .subscribe(res => {
        this.chamadofeed = res;
        this.chamadofeed.feedbackUsuario = this.meuFeedback;
        this.enviarFeedback();
    });
  }

  // enviar novo feedback
  async enviarFeedback() {
    this.chamadoService.atualizarFeed(this.chamadofeed)
    .subscribe(res => {
      this.buscarFiltro(this.filtro);

  });
}


  sair() {
    this.authService.logout();
  }


  toDetail(id) {
    this.navCtrl.navigateForward(['/tabs/tab-detalhe/' + id]);
  }

}
