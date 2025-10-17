import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon,
    ReactiveFormsModule, CommonModule
  ]
})
export class PaymentMethodsPage implements OnInit {
  saving = false;
  userId: string | null = null;
  methods: Array<{ id_mediopago: number; tipo: string; numero_enmarcado: string; vencimiento: string }> = [];

  cardForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: ['', [Validators.required, Validators.pattern(/^[\d\s]{13,19}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.userId = await this.supabase.getCurrentUserId();
    if (this.userId) {
      this.methods = await this.supabase.listPaymentMethods(this.userId);
    }
  }

  private detectBrand(num: string): string {
    const n = num.replace(/\s+/g, '');
    if (/^4\d{12,18}$/.test(n)) return 'Visa';
    if (/^(5[1-5]\d{14}|2(2[2-9]\d|[3-6]\d{2}|7[01]\d|720)\d{12})$/.test(n)) return 'MasterCard';
    if (/^3[47]\d{13}$/.test(n)) return 'Amex';
    if (/^6(?:011|5)\d{12,15}$/.test(n)) return 'Discover';
    return 'Tarjeta';
  }

  async onSubmit() {
    if (this.cardForm.invalid) {
      this.cardForm.markAllAsTouched();
      return;
    }
    if (!this.userId) {
      const a = await this.alertCtrl.create({
        header: 'Inicia sesión',
        message: 'Debes iniciar sesión para guardar un método de pago.',
        buttons: ['OK']
      });
      await a.present();
      return;
    }

    this.saving = true;
    const { name, number, expiry } = this.cardForm.value as any;
    const clean = (number as string).replace(/\s+/g, '');
    const last4 = clean.slice(-4);
    const brand = this.detectBrand(clean);

    try {
      await this.supabase.addPaymentMethod(this.userId, {
        type: brand,
        last4,
        expiry
      });
      const ok = await this.alertCtrl.create({
        header: 'Guardado',
        message: `Se guardó ${brand} •••• ${last4}`,
        buttons: ['OK']
      });
      await ok.present();

      // refrescar lista
      this.methods = await this.supabase.listPaymentMethods(this.userId);
      this.cardForm.reset();
    } catch (e: any) {
      const err = await this.alertCtrl.create({
        header: 'Error',
        message: e?.message || 'No se pudo guardar el método.',
        buttons: ['OK']
      });
      await err.present();
    } finally {
      this.saving = false;
    }
  }

  trackById(_: number, m: any) { return m.id_mediopago; }
}