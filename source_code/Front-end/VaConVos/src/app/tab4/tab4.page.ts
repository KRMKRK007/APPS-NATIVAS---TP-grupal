import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonAvatar, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthSimService } from '../services/auth-sim.service';
import { AuthButtonsComponent } from '../shared/auth-buttons.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
    IonAvatar, IonList, IonItem, IonLabel, FormsModule, AuthButtonsComponent
  ],
})
export class Tab4Page {
  constructor(private router: Router, private alertCtrl: AlertController) {}

  goToAddresses() { this.router.navigate(['/addresses']); }
  goToPaymentMethods() { this.router.navigate(['/payment-methods']); }
  goToEditProfile() { this.router.navigate(['/edit-profile']); }

  async openContact() {
    const a = await this.alertCtrl.create({
      header: 'Contacto',
      message: 'Escríbenos a soporte@vaconvos.test',
      buttons: ['OK'],
    });
    await a.present();
  }

  async openSupport() {
    const a = await this.alertCtrl.create({
      header: 'Atención al cliente',
      message: 'Pronto un agente se comunicará contigo.',
      buttons: ['OK'],
    });
    await a.present();
  }
  async signOut() {
    sessionStorage.removeItem('sim_auth');
    sessionStorage.removeItem('sim_user_email');
    const a = await this.alertCtrl.create({
      header: 'Sesión cerrada',
      message: 'Cierre de sesión simulado.',
      buttons: ['OK'],
    });
    await a.present();
  }

}
