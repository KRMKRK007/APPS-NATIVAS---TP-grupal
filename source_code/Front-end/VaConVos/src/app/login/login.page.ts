import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonInput, IonButton, AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

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

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async login() {
    if (!this.email || !this.password) return;
    this.loading = true;
    try {
      await this.supabase.signIn({ email: this.email, password: this.password });
      await this.router.navigate(['/tabs/tab1']);
    } catch (e: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error de inicio de sesión',
        message: e?.message || 'Credenciales inválidas',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
