import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http'; // <-- 1. IMPORTA ESTO
import { addIcons } from 'ionicons';
import { 
  home, basket, time, person, leaf, leafOutline, mailOutline, lockClosedOutline,
  logInOutline, personAddOutline, imageOutline, add, basketOutline, arrowBackOutline,
  checkmarkCircle, heart, heartOutline, star, starOutline, filterOutline,
  chevronForwardOutline, callOutline, chatbubblesOutline, locationOutline, 
  cardOutline, personOutline, informationCircleOutline, logOutOutline,
  helpCircleOutline, arrowBack, image, restaurant, storefront, wine, storefrontOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Registrar todos los iconos globalmente
addIcons({
  home, basket, time, person, leaf, leafOutline, mailOutline, lockClosedOutline,
  logInOutline, personAddOutline, imageOutline, add, basketOutline, arrowBackOutline,
  checkmarkCircle, heart, heartOutline, star, starOutline, filterOutline,
  chevronForwardOutline, callOutline, chatbubblesOutline, locationOutline, 
  cardOutline, personOutline, informationCircleOutline, logOutOutline,
  helpCircleOutline, arrowBack, image, restaurant, storefront, wine, storefrontOutline
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // <-- 2. AÑADE ESTO
  ],
});