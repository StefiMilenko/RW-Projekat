import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player } from '../models/player.model';
import { PlayerActions } from '../player-store/player.actions';

@Component({
  selector: 'app-player-card',
  standalone: true,
  template: `
    <div>
      <span>{{ player.username }} - Gold: {{ player.gold }}</span>
      <button (click)="onUpdate()">+100 gold</button>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
})
export class PlayerCardComponent {
  @Input({ required: true }) player!: Player;
  private store = inject(Store);

  onUpdate() {
    this.store.dispatch(PlayerActions.updateGold({ id: this.player.id, gold: this.player.gold + 100 }));
  }

  onDelete() {
    this.store.dispatch(PlayerActions.deletePlayer({ id: this.player.id }));
  }
}