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
  IonFooter} from '@ionic/angular/standalone';
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
  constructor() {}

  goTo(page: string) {
    console.log('Navegar a:', page);
    // Aquí puedes usar router.navigate(['/ruta']) según tus páginas
  }
}

