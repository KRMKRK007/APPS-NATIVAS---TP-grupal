// filepath: c:\Users\carme\OneDrive\Escritorio\FACULTAD\1er año\2do Cuatrimestre\Apps nativas\Va con vos app\455c6e9a5b66741f37bb968e27a48b9d3fd8107c\source_code\Front-end\VaConVos\src\app\payment-methods\payment-methods.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthSimService } from '../services/auth-sim.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton, ReactiveFormsModule, CommonModule
  ]
})
export class PaymentMethodsPage implements OnInit {
  saving = false;
  methods = this.auth.listPaymentMethods();

  cardForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: ['', [Validators.required, Validators.pattern(/^[\d\s]{13,19}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthSimService) {}

  ngOnInit(): void {}

  private brand(num: string): string {
    const n = num.replace(/\s+/g, '');
    if (/^4\d{12,18}$/.test(n)) return 'Visa';
    if (/^(5[1-5]\d{14}|2(2[2-9]\d|[3-6]\d{2}|7[01]\d|720)\d{12})$/.test(n)) return 'MasterCard';
    if (/^3[47]\d{13}$/.test(n)) return 'Amex';
    if (/^6(?:011|5)\d{12,15}$/.test(n)) return 'Discover';
    return 'Tarjeta';
  }

  onSubmit() {
    if (this.cardForm.invalid) { this.cardForm.markAllAsTouched(); return; }
    this.saving = true;
    const { number, expiry } = this.cardForm.value as any;
    const clean = (number as string).replace(/\s+/g, '');
    this.auth.addPaymentMethod({ tipo: this.brand(clean), last4: clean.slice(-4), vencimiento: expiry });
    this.methods = this.auth.listPaymentMethods();
    this.cardForm.reset();
    this.saving = false;
  }

  remove(id: number) {
    this.auth.removePaymentMethod(id);
    this.methods = this.auth.listPaymentMethods();
  }

  trackById(_: number, m: any) { return m.id; }
}