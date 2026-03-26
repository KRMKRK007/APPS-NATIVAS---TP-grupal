import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButtons, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthSimService } from '../services/auth-sim.service';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonText, CommonModule],
  template: `
    <ion-buttons slot="end">
      <ion-text *ngIf="auth.getUser()?.name" class="ion-padding-end">{{ auth.getUser()?.name }}</ion-text>
      <ion-button *ngIf="!auth.estaAutenticado()" (click)="goLogin()">Iniciar Sesión</ion-button>
      <ion-button *ngIf="!auth.estaAutenticado()" fill="clear" (click)="goRegister()">Registro</ion-button>
      <ion-button *ngIf="auth.estaAutenticado()" color="danger" (click)="logout()">Cerrar sesión</ion-button>
    </ion-buttons>
  `,
})
export class AuthButtonsComponent {
  constructor(public auth: AuthSimService, private router: Router) {}
  goLogin() { this.router.navigate(['/login']); }
  goRegister() { this.router.navigate(['/register']); }
  async logout() { await this.auth.logoutSimulado(); }
}