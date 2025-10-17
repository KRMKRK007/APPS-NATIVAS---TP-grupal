import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent]
})
export class AddressesPage {}