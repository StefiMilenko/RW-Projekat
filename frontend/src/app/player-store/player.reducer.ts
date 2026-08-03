import { createReducer, on } from '@ngrx/store';
import { playerAdapter, initialPlayerState } from './player.state';
import { PlayerActions } from './player.actions';

export const playerReducer = createReducer(
  initialPlayerState,

  on(PlayerActions.loadPlayers, (state) => ({ ...state, loading: true, error: null })),
  on(PlayerActions.loadPlayersSuccess, (state, { players }) =>
    playerAdapter.setAll(players, { ...state, loading: false }),
  ),
  on(PlayerActions.loadPlayersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PlayerActions.updateGoldSuccess, (state, { player }) =>
    playerAdapter.updateOne({ id: player.id, changes: player }, state),
  ),
  on(PlayerActions.updateGoldFailure, (state, { error }) => ({ ...state, error })),

  on(PlayerActions.deletePlayerSuccess, (state, { id }) => playerAdapter.removeOne(id, state)),
  on(PlayerActions.deletePlayerFailure, (state, { error }) => ({ ...state, error })),
);