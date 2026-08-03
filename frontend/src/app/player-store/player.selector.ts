import { createFeatureSelector, createSelector } from '@ngrx/store';
import { playerAdapter, PlayerState } from './player.state';

export const selectPlayerState = createFeatureSelector<PlayerState>('players');
export const { selectAll: selectAllPlayers } = playerAdapter.getSelectors(selectPlayerState);
export const selectPlayersLoading = createSelector(selectPlayerState, (s) => s.loading);