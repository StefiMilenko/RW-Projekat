import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Player } from '../models/player.model';

export interface PlayerState extends EntityState<Player> {
  loading: boolean;
  error: string | null;
}

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = playerAdapter.getInitialState({
  loading: false,
  error: null,
});