// filepath: c:\Users\carme\OneDrive\Escritorio\FACULTAD\1er año\2do Cuatrimestre\Apps nativas\Va con vos app\455c6e9a5b66741f37bb968e27a48b9d3fd8107c\source_code\Front-end\VaConVos\src\app\register\register.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonInput, IonButton, AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthSimService } from '../services/auth-sim.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, FormsModule],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  loading = false;

  constructor(private auth: AuthSimService, private router: Router, private alert: AlertController) {}

  async register() {
    this.loading = true;
    this.auth.saveProfile({ name: this.name || 'Usuario', email: this.email });
    await this.auth.loginSimulado(this.email, this.password);
    const ok = await this.alert.create({ header: 'Registro simulado', message: 'Cuenta creada localmente.', buttons: ['OK'] });
    await ok.present();
    this.router.navigate(['/tabs/tab1']);
    this.loading = false;
  }

  goToLogin() { this.router.navigate(['/login']); }
}