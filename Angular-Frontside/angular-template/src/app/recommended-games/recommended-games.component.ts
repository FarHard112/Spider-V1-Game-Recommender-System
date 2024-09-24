import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameResponse , DataService} from '../services/data.service';

@Component({
  selector: 'app-recommended-games',
  templateUrl: './recommended-games.component.html',
  styleUrls: ['./recommended-games.component.scss'],
  standalone: true,
  imports: [CommonModule, GameCardComponent]
})
export class RecommendedGamesComponent implements OnInit {
  public recommendedGames: GameResponse[] = []

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getFavoritedAndRecommended();
    console.log(this.recommendedGames)
   }

  getFavoritedAndRecommended() {
    this.dataService.getFavoritedAndRecommended().subscribe({
      next: (games: GameResponse[]) => {
        this.recommendedGames = games
        console.log("this is games",games);
        
      }, // Add the type Game[] here
      error: (err: any) => console.error('Failed to load games', err) // Explicitly type 'err' if needed
    });
  }
}
