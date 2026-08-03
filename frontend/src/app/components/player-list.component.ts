import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PlayerActions } from '../player-store/player.actions';
import { selectAllPlayers } from '../player-store/player.selector';
import { PlayerCardComponent } from './player-card.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  template: `
    <div *ngFor="let player of players$ | async">
      <app-player-card [player]="player"></app-player-card>
    </div>
  `,
})
export class PlayerListComponent implements OnInit {
  private store = inject(Store);
  players$ = this.store.select(selectAllPlayers);

  ngOnInit() {
    this.store.dispatch(PlayerActions.loadPlayers());
  }
}