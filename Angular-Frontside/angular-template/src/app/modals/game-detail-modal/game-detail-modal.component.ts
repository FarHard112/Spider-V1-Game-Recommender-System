import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService, GameResponse } from '../../services/data.service';

@Component({
  selector: 'app-game-detail-modal',
  templateUrl: './game-detail-modal.component.html',
  styleUrls: ['./game-detail-modal.component.scss'],
  standalone: true,
})
export class GameDetailModalComponent {
  @Input() game!: GameResponse;
  @Output() close = new EventEmitter<void>();

  constructor(private dataService: DataService){}

  closeModal(): void {
    this.close.emit();
  }
}
