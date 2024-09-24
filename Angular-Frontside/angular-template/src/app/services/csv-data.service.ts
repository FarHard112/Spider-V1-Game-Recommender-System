import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

interface GameData {
  name: string;
  image_url: string;
}

interface PapaParseResult {
  data: GameData[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    fields: string[];
    truncated: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CsvDataService {
  private gamesData: GameData[] = [];  // Use the GameData interface here

  constructor(private http: HttpClient) {
    this.loadCsvData(); // Load CSV data when the service is instantiated
  }

  private loadCsvData(): void {
    const path = '/assets/filtered_games.csv';
    this.http.get(path, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: (results: PapaParseResult) => {
              this.gamesData = results.data;
            }
          });
        },
        error: (error) => console.error('Error loading CSV data', error)
      });
  }

  loadGameUrlByName(gameName: string): string | undefined {
    const game = this.gamesData.find(g => g.name === gameName);
    return game ? game.image_url : undefined;  // Safely access the image_url
  }
}
