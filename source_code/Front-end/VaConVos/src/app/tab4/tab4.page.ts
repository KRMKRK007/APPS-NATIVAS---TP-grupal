import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonButton, IonIcon, IonAvatar, 
  IonList, IonItem, IonLabel, IonTabBar, IonTabButton, IonFooter, 
  AlertController, ModalController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SupabaseService } from '../services/supabase.service';
import { LoginModalComponent } from '../auth/login-modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButtons, 
    IonBackButton, IonButton, IonIcon, IonFooter, IonAvatar, IonList, IonItem, 
    IonLabel, IonTabBar, IonTabButton],
})
export class Tab4Page {
  isLoggedIn = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private supabase: SupabaseService,
    private modalCtrl: ModalController
  ) {
    this.supabase.sessionChanges().subscribe(s => this.isLoggedIn = !!s);
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({ component: LoginModalComponent });
    await modal.present();
    await modal.onDidDismiss(); // si querés reaccionar a role==='success'
  }

  // Navegación
  goToEditProfile() { this.router.navigate(['/edit-profile']); }
  goToAddresses()   { this.router.navigate(['/addresses']); }
  goToPaymentMethods() { this.router.navigate(['/payment-methods']); }

  // Cerrar sesión
  async signOut() {
    try {
      await this.supabase.signOut();
      const ok = await this.alertController.create({
        header: 'Sesión cerrada',
        buttons: ['OK']
      });
      await ok.present();
    } catch (e: any) {
      const alert = await this.alertController.create({
        header: 'Error al cerrar sesión',
        message: e?.message || 'Intenta nuevamente',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Acción para el botón "Contacto"
async openContact() {
  const alert = await this.alertController.create({
    header: 'Contacto',
    message: 'Ingresá tus datos de contacto:',
    inputs: [
      {
        name: 'telefono',
        type: 'tel',
        placeholder: 'Teléfono'
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Guardar',
        handler: (data) => {
          console.log('Contacto guardado:', data);
          // Acá podés manejar los datos, por ej. guardarlos en storage o enviarlos al backend
        }
      }
    ]
  });
  await alert.present();
}

// Acción para el botón "Atención al cliente"
async openSupport() {
  const alert = await this.alertController.create({
    header: 'Atención al Cliente',
    message: 'Escribí tu consulta y te responderemos:',
    inputs: [
      {
        name: 'mensaje',
        type: 'textarea',
        placeholder: 'Escribí tu mensaje aquí'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Enviar',
        handler: (data) => {
          console.log('Consulta enviada:', data);
          // Acá podés procesar el mensaje, por ej. mandarlo al soporte
        }
      }
    ]
  });
  await alert.present();
}
}
