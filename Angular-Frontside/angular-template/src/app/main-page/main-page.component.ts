import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedGamesComponent } from '../recommended-games/recommended-games.component';
import { PlayersAlsoPlayedComponent } from '../players-also-played/players-also-played.component';
import { AllGamesComponent } from "../all-games/all-games.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RecommendedGamesComponent,
    PlayersAlsoPlayedComponent,
    AllGamesComponent
]
})
export class MainPageComponent {}
