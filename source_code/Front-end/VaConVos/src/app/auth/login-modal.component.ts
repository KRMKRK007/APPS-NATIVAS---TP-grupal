import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonList, IonItem, IonLabel, IonInput, IonSpinner
} from '@ionic/angular/standalone';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonList, IonItem, IonLabel, IonInput, IonSpinner, FormsModule
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" [(ngModel)]="email" autocomplete="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Contraseña</ion-label>
          <ion-input type="password" [(ngModel)]="password" autocomplete="current-password"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="block" [disabled]="loading" (click)="submit()">
        <ion-spinner *ngIf="loading" name="dots"></ion-spinner>
        <span *ngIf="!loading">{{ isRegister ? 'Registrarme' : 'Ingresar' }}</span>
      </ion-button>

      <ion-button expand="block" fill="clear" (click)="toggleMode()">
        {{ isRegister ? 'Ya tengo cuenta' : 'Crear cuenta' }}
      </ion-button>
    </ion-content>
  `
})
export class LoginModalComponent {
  email = '';
  password = '';
  isRegister = false;
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private supabase: SupabaseService,
    private alertCtrl: AlertController
  ) {}

  toggleMode() { this.isRegister = !this.isRegister; }

  async submit() {
    this.loading = true;
    try {
      if (this.isRegister) {
        await this.supabase.signUp({ email: this.email, password: this.password });
        const ok = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Revisa tu correo para confirmar la cuenta.',
          buttons: ['OK']
        });
        await ok.present();
        this.isRegister = false;
      } else {
        await this.supabase.signIn({ email: this.email, password: this.password });
        this.modalCtrl.dismiss(true, 'success');
      }
    } catch (e: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: e?.message || 'Ocurrió un error',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}