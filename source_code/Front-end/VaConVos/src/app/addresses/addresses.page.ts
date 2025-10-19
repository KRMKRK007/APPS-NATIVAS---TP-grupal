// filepath: c:\Users\carme\OneDrive\Escritorio\FACULTAD\1er año\2do Cuatrimestre\Apps nativas\Va con vos app\455c6e9a5b66741f37bb968e27a48b9d3fd8107c\source_code\Front-end\VaConVos\src\app\addresses\addresses.page.ts
import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthSimService } from '../services/auth-sim.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, FormsModule]
})
export class AddressesPage {
  line1 = '';
  city = '';
  addresses = this.auth.listAddresses();

  constructor(private auth: AuthSimService) {}

  add() {
    if (!this.line1) return;
    this.auth.addAddress({ line1: this.line1, city: this.city });
    this.addresses = this.auth.listAddresses();
    this.line1 = ''; this.city = '';
  }

  remove(id: number) {
    this.auth.removeAddress(id);
    this.addresses = this.auth.listAddresses();
  }
}