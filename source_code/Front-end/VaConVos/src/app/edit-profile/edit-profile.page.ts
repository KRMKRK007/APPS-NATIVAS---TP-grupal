import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent]
})
export class EditProfilePage {}