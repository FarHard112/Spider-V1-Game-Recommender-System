import { Component, OnInit } from '@angular/core';
import { DataService, GameResponse } from '../services/data.service'; // Adjust path as necessary
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';


@Component({
  selector: 'app-players-also-played',
  templateUrl: './players-also-played.component.html',
  styleUrls: ['./players-also-played.component.scss'],
  standalone: true,
  imports: [GameCardComponent, CommonModule]
})
export class PlayersAlsoPlayedComponent implements OnInit {
  playersAlsoPlayed: GameResponse[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchPlayersAlsoPlayedGames();
    console.log(this.playersAlsoPlayed)
  }

  fetchPlayersAlsoPlayedGames() {
    this.dataService.getPlayersAlsoPlayed('59945701').subscribe({
      next: (games: GameResponse[]) => this.playersAlsoPlayed = games, // Add the type Game[] here
      error: (err: any) => console.error('Failed to load games', err) // Explicitly type 'err' if needed
    });

  }
}
