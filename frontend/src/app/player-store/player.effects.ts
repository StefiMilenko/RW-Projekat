import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { PlayerActions } from './player.actions';

@Injectable()
export class PlayerEffects {
  private actions$ = inject(Actions);
  private playerService = inject(PlayerService);

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      mergeMap(() =>
        this.playerService.getAll().pipe(
          map((players) => PlayerActions.loadPlayersSuccess({ players })),
          catchError((error) => of(PlayerActions.loadPlayersFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updateGold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.updateGold),
      mergeMap(({ id, gold }) =>
        this.playerService.updateGold(id, gold).pipe(
          map((player) => PlayerActions.updateGoldSuccess({ player })),
          catchError((error) => of(PlayerActions.updateGoldFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.deletePlayer),
      mergeMap(({ id }) =>
        this.playerService.remove(id).pipe(
          map(() => PlayerActions.deletePlayerSuccess({ id })),
          catchError((error) => of(PlayerActions.deletePlayerFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}