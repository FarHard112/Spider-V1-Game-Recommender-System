import { Component, Input } from '@angular/core';
import { GameDetailModalComponent } from '../modals/game-detail-modal/game-detail-modal.component';
import { CommonModule } from '@angular/common';
import { DataService, GameResponse } from '../services/data.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  standalone: true,
  imports: [GameDetailModalComponent,CommonModule]

})

export class GameCardComponent {
  @Input() game!: GameResponse;

  showModal: boolean = false;

  constructor(private dataService: DataService) {} // Inject the DataService

  openModal(): void {
    this.showModal = true; 
    this.addToFav(this.game.ID)   
  }

  closeModal(): void {
    this.showModal = false;
  }

  playGame(): void { // todo: fix this after adding the apis
    console.log(`Playing ${this.game.name}`);
  }

  private addToFav(gameId: number): void {
    this.dataService.addToFav(gameId).subscribe({
      next: (response) => console.log('Added to favorites', response),
      error: (error) => console.error('Error adding to favorites', error)
    });
}
}
