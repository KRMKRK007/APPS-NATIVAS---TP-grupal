import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { AuthSimService } from '../services/auth-sim.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton
  ]
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