import { AuthService } from './../shared/services/auth.service';
import { ChamadoInterface } from './../shared/interfaces/Chamado';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ChamadoService } from '../shared/services/ChamadoService.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-novoChamadoPage',
  templateUrl: './tab-novoChamado.page.html',
  styleUrls: ['./tab-novoChamado.scss']
})
// tslint:disable-next-line:component-class-suffix
export class TabNovoChamadoPage implements OnInit {

  token = localStorage.getItem('Token');
  chamados: ChamadoInterface[] = [];

  totalEducandos: number;
  confirmacao = false;

  chamado: ChamadoInterface;
  meuChamado: any;
  data: any;
  novoChamadoForm: FormGroup;
  newData = new Date().toISOString().slice(0, 10);

  foto: string;
  imageSelected = false;
  enviado = false;
  fileSelected = null;

  categorias: any;
  selectedEnvolveAreaComum: boolean;
  areasComuns: any;
  apartamentos: any;
  meusApartamentos: any[] = [];
  bloco: any;
  empreendimento: any;
  fotoPronta: any;

  constructor(public navCtrl: NavController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public toastController: ToastController,
              public route: ActivatedRoute,
              public router: Router,
              private formBuilder: FormBuilder,
              private camera: Camera,
              private http: HttpClient,
              private authService: AuthService,
              private chamadoService: ChamadoService) {}

  async ngOnInit() {
    this.empreendimentosDoProprietario();
    this.listarAreaComuns();
    this.listarcategorias();
    this.listarApartamentos();
    this.createForm();
    this.confirmacao = true;
  }


  async createForm() {
    this.novoChamadoForm = this.formBuilder.group({
      apartamento: ['', Validators.required],
      envolveAreaComum: [''],
      areaComum: [''],
      descricao: ['', Validators.required],
      categoriaProblema: ['', Validators.required]
    });

  }

  async adicionar() {
    const loading = await this.loadingController.create({
      message: 'Cadastrando...'
    });
    await loading.present();
    this.novoChamadoForm.value.envolveAreaComum = this.selectedEnvolveAreaComum;
    if (this.foto) {
        // this.novoChamadoForm.value.img = this.foto;
        this.novoChamadoForm.value.img = this.fotoPronta;
    }
    await this.chamadoService.adicionar(this.novoChamadoForm.value)
    .subscribe(
      res => {
        this.confirmacao = true;
        this.chamados.push(res);
        this.meuChamado = res;
        this.bloco = '';
        this.empreendimento = '';
        this.foto = null;
        this.imageSelected = null;
        this.navCtrl.navigateBack(['/tabs/tab-home', {confirmacao: this.confirmacao}]);
        this.novoChamadoForm.reset();
        loading.dismiss();
        this.adicionarToast();
      }, err => {
        loading.dismiss();
      });
  }

  limparForm() {
    this.novoChamadoForm.reset();
    this.bloco = '';
    this.empreendimento = '';
    this.imageSelected = null;
    this.foto = null;
  }

  async empreendimentosDoProprietario() {
    this.chamadoService.empreendimentoProprietario()
    .subscribe(data => {
    });
  }

  async listarcategorias() {
    this.chamadoService.listarCategorias()
    .subscribe(data => {
      this.categorias = data;
    });
  }

  async listarApartamentos() {
    this.chamadoService.listarApartamentos()
    .subscribe(data => {
      this.apartamentos = data;
    });
  }

  checkValueApartamento(evento) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.apartamentos.length; index++) {
      this.meusApartamentos.push(this.apartamentos[index]);
      if (evento.detail.value === this.apartamentos[index].id) {
        this.bloco = this.apartamentos[index].bloco.bloco;
        this.empreendimento = this.apartamentos[index].bloco.empreendimento.nomeEmpreendimento;
      }
    }
  }

  listarAreaComuns() {
    this.chamadoService.listarAreasComuns()
    .subscribe(data => {
      this.areasComuns = data;
      // console.log("Areas Comuns", data);
    });
  }

  checkValueAreaComun(evento) {
    // console.log(evento.detail.value);
    if (evento.detail.value === '') {
      this.selectedEnvolveAreaComum = false;
    } else {
      this.selectedEnvolveAreaComum = true;
    }
  }

  // UPLOAD IMAGEM
  onSelect(event) {
    this.fileSelected = event.target.files[0] as File;
    // console.log(this.imageSelected);
    this.imageSelected = true;
  }

  deletarImagem() {
    this.foto = null;
    this.imageSelected = false;
  }

  onUpload() {
    const formData = new FormData();
    formData.append('img', this.fileSelected, this.fileSelected.name);

    const headers = new HttpHeaders()
    .set('Authorization', 'Token ' + this.token);

    const data: Observable<any> = this.http.post(`${environment.baseUrl}imagem/`, formData, {headers});
    // const data: Observable<any> =  this.http.post('http://127.0.0.1:8000/imagem/', formData);
    data.subscribe((res => {
      this.foto = res.img;
      this.fotoPronta = this.foto.substring(47);
    }));
  }

  // -----------------------Upload Image end----------------------

  sair() {
    this.authService.logout();
  }

  async adicionarToast() {
    const toast = await this.toastController.create({
      message: 'Adicionado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

}





  // tirarFoto2() {
  //   this.foto = '';

  //   const options: CameraOptions = {
  //       quality: 100,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.PNG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   };

  //   this.camera.getPicture(options)
  //   .then((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //   // If it's base64 (DATA_URL):
  //   this.foto = 'data:image/png;base64,' + imageData;
  //   }, (err) => {
  //   // console.log(err);
  //   });
  // }

