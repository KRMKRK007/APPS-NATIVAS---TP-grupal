import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonInput, IonButton, AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
    IonInput, IonButton, FormsModule
  ],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async login() {
    this.loading = true;
    // Simulación de login: guarda bandera en sessionStorage
    sessionStorage.setItem('sim_auth', '1');
    sessionStorage.setItem('sim_user_email', this.email || 'user@example.com');

    const ok = await this.alertCtrl.create({
      header: 'Sesión iniciada',
      message: 'Login simulado exitoso.',
      buttons: ['OK'],
    });
    await ok.present();

    await this.router.navigate(['/tabs/tab1']);
    this.loading = false;
  }

  goToRegister() { this.router.navigate(['/register']); }
}
