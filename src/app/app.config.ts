import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"pixelboom-ea996","appId":"1:783774266714:web:5ae047b79da553c520af63","storageBucket":"pixelboom-ea996.appspot.com","apiKey":"AIzaSyD8plZN-lG4E0-KmlXALaWvxV-UY_CPZX8","authDomain":"pixelboom-ea996.firebaseapp.com","messagingSenderId":"783774266714"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
