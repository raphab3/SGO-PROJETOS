import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
})
export class PageLoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private navCtrl: NavController,
              private router: Router,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  async createForm() {
    this.loginForm =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  async login() {

    const loading = await this.loadingController.create({
      message: 'Autenticando Usuário...'
    });
    await loading.present();
    this.authService.login(this.loginForm.value)
    .subscribe(res => {
      if (res.token) {
        localStorage.setItem('Token', res.token);
        loading.dismiss();
        this.navCtrl.navigateForward(['/tabs/tab-home']);
        this.loginToast();
      }
    }, error => {
      this.loginToastError();
      loading.dismiss();
      localStorage.removeItem('Token');
    });
  }

  async loginToast() {
    const toast = await this.toastController.create({
      message: 'Login realizado com sucesso!',
      duration: 1000
    });
    toast.present();
  }

  async loginToastError() {
    const toast = await this.toastController.create({
      message: 'Usuário e/ou senha inválido(s)!',
      duration: 1000
    });
    toast.present();
  }

}
