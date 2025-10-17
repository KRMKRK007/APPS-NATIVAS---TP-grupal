import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonInput, IonButton, AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
    IonInput, IonButton, FormsModule
  ],
})
export class RegisterPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async register() {
    if (!this.email || !this.password) return;
    this.loading = true;
    try {
      await this.supabase.signUp({ email: this.email, password: this.password });
      const ok = await this.alertCtrl.create({
        header: 'Registro exitoso',
        message: 'Revisa tu correo para confirmar la cuenta.',
        buttons: ['OK'],
      });
      await ok.present();
      await this.router.navigate(['/login']);
    } catch (e: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error de registro',
        message: e?.message || 'No se pudo crear la cuenta',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}