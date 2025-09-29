import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon, 
  IonAvatar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonTabBar, 
  IonTabButton, 
  IonFooter, 
  AlertController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon, IonFooter, 
  IonAvatar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonTabBar, 
  IonTabButton],
})
export class Tab4Page {
  constructor(private alertController: AlertController) {}

  goTo(page: string) {
    console.log('Navegar a:', page);
    // Aquí puedes usar router.navigate(['/ruta']) según tus páginas
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
