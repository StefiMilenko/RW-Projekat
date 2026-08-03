import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { itemReducer } from './item-store/item.reducer';
import { ItemEffects } from './item-store/item.effects';
import { playerReducer } from './player-store/player.reducer';
import { PlayerEffects } from './player-store/player.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore({ items: itemReducer, players: playerReducer}),
    provideEffects([ItemEffects, PlayerEffects]),
  ],
};