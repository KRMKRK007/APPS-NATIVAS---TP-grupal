import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type SimStore = {
  isAuth: boolean;
  user: { name: string; email: string } | null;
  addresses: Array<{ id: number; line1: string; city?: string }>;
  paymentMethods: Array<{ id: number; tipo: string; last4: string; vencimiento: string }>;
};

const KEY = 'sim_auth_store';

@Injectable({ providedIn: 'root' })
export class AuthSimService {
  private state$ = new BehaviorSubject<SimStore>(this.read());

  estaAutenticado() { return this.state$.value.isAuth; }
  changes() { return this.state$.asObservable(); }

  async loginSimulado(email: string, _password: string) {
    const name = email.split('@')[0] || 'Usuario';
    const s = this.read();
    s.isAuth = true;
    s.user = { name, email };
    this.write(s);
  }

  async logoutSimulado() {
    const s = this.read();
    s.isAuth = false;
    s.user = null;
    this.write(s);
  }

  getUser() { return this.state$.value.user; }
  saveProfile(user: { name: string; email: string }) {
    const s = this.read();
    s.user = user;
    this.write(s);
  }

  listAddresses() { return this.state$.value.addresses; }
  addAddress(a: { line1: string; city?: string }) {
    const s = this.read();
    const id = Date.now();
    s.addresses.unshift({ id, ...a });
    this.write(s);
  }
  removeAddress(id: number) {
    const s = this.read();
    s.addresses = s.addresses.filter(x => x.id !== id);
    this.write(s);
  }

  listPaymentMethods() { return this.state$.value.paymentMethods; }
  addPaymentMethod(pm: { tipo: string; last4: string; vencimiento: string }) {
    const s = this.read();
    s.paymentMethods.unshift({ id: Date.now(), ...pm });
    this.write(s);
  }
  removePaymentMethod(id: number) {
    const s = this.read();
    s.paymentMethods = s.paymentMethods.filter(x => x.id !== id);
    this.write(s);
  }

  private read(): SimStore {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as SimStore;
    } catch {}
    return { isAuth: false, user: null, addresses: [], paymentMethods: [] };
  }
  private write(s: SimStore) {
    localStorage.setItem(KEY, JSON.stringify(s));
    this.state$.next(s);
  }
}