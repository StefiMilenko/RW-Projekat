import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Player } from '../models/player.model';

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Load Players': emptyProps(),
    'Load Players Success': props<{ players: Player[] }>(),
    'Load Players Failure': props<{ error: string }>(),

    'Update Gold': props<{ id: number; gold: number }>(),
    'Update Gold Success': props<{ player: Player }>(),
    'Update Gold Failure': props<{ error: string }>(),

    'Delete Player': props<{ id: number }>(),
    'Delete Player Success': props<{ id: number }>(),
    'Delete Player Failure': props<{ error: string }>(),
  },
});