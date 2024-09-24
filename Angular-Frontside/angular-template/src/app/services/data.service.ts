import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders} from '@angular/common/http';
import { Observable , map} from 'rxjs';
import { CsvDataService } from './csv-data.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl ="http://38.242.232.191:7745"
  private recommendedGamesUrl = 'https://api.example.com/games'; // URL to your API

  constructor(private http: HttpClient, private csvDataService: CsvDataService) { }

  fetchInitialGames(limit: number = 3): Observable<GameResponse[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<GameResponse[]>(this.recommendedGamesUrl, { params });
  }

  fetchHardcodedData(): GameResponse[]{
    return hardcodedGAmes
  }

  getFavoritedAndRecommended(): Observable<GameResponse[]> {
    const endpoint = `${this.baseUrl}/api/Home/get-favorited-and-recommended?page=1&pageSize=10`;
    return this.http.get<GameResponse[]>(endpoint, { headers: { 'Accept': '*/*' } }).pipe(
      map((response: GameResponse[]) => {
        return response.filter(game => game.game_description !== null).map(game => {
          game.imgUrl = this.csvDataService.loadGameUrlByName(game.name);
          return game;
        }).slice(0, 3);
      })
    );
  }

  getPlayersAlsoPlayed(userId: string): Observable<GameResponse[]> {
    const endpoint = `${this.baseUrl}/api/Home/get-collaborative-filter-recommends`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ userId: userId });

    return this.http.post<GameResponse[]>(endpoint, body, { headers: headers }).pipe(
      map((response: GameResponse[]) => {
        // Assuming the response structure is similar and needs to filter and add image URLs
        return response.filter(game => game.game_description !== null).map(game => {
          game.imgUrl = this.csvDataService.loadGameUrlByName(game.name);
          return game;
        }).slice(0, 3);
      })
    );
  }

  addToFav(id: number): Observable<Object> {
    const recommendedGamesUrl = `${this.baseUrl}/api/Home/update-favorite/${id}`;

    console.log("Adding to favorites: " + id);

    const requestBody = true; // Sending a simple true as body

    return this.http.put(recommendedGamesUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'  // Ensure proper content type header
      }
    });
  }
}

export interface GameResponse {
  ID: number;
  url?: string;
  types?: string;
  name: string;
  desc_snippet?: string;
  recent_reviews?: string | null;
  all_reviews?: string;
  release_date?: string;
  developer?: string;
  publisher?: string;
  popular_tags?: string;
  game_details?: string;
  languages?: string;
  achievements?: string | null;
  genre?: string;
  game_description: string;
  mature_content?: string | null;
  minimum_requirements?: string;
  recommended_requirements?: string;
  original_price?: string;
  discount_price?: string | null;
  is_favorite?: boolean | null;
  imgUrl?: string; // Optional property for image URL
}


const hardcodedGAmes: GameResponse[] = [
  {
    ID: 312,
    url: "https://store.steampowered.com/app/311310/Naval_Action/",
    types: "app",
    name: "Naval Action",
    desc_snippet: "Naval Action is a hardcore, realistic, and beautifully detailed naval combat sandbox immersing players into the experience of the most beautiful period of naval history - when sailing ships ruled the seas.",
    recent_reviews: null,
    all_reviews: "Mixed,(4,179),- 59% of the 4,179 user reviews for this game are positive.",
    release_date: "Jun 13, 2019",
    developer: "Game-Labs",
    publisher: "Game-Labs,Game-Labs",
    popular_tags: "Naval,Open World,Massively Multiplayer,Simulation,Pirates,Strategy,Historical,Adventure,Early Access,Action,Multiplayer,Sailing,Indie,Realistic,Sandbox,Military,Atmospheric,PvP,Co-op,Singleplayer",
    game_details: "Multi-player,Online Multi-Player,MMO,Online Co-op",
    languages: "English,French,German,Spanish - Spain,Japanese,Korean,Russian,Simplified Chinese,Spanish - Latin America",
    achievements: null,
    genre: "Action,Adventure,Indie,Massively Multiplayer,Simulation,Strategy",
    game_description: "About This Game Naval Action is a hardcore, realistic, and beautifully detailed naval combat game immersing players into the experience of the most beautiful period of naval history - when sailing ships ruled the seas.",
    mature_content: null,
    minimum_requirements: "Minimum:,OS:,64 bit Windows 7 and above,Processor:,Intel Core i5-4570 3.2 GHz or AMD Phenom(tm) II X4 B60 3.3 GHz,Memory:,4 GB RAM,Graphics:,GeForce GTX 460 1GB or AMD Radeon HD 6850 1GB (must support shader 5 model),DirectX:,Version 11,Network:,Broadband Internet connection,Storage:,2 GB available space,Additional Notes:,32bit OS versions is not supported",
    recommended_requirements: "Recommended:,OS:,64 bit Windows 7 and above,Processor:,Intel Core i7-3770 3.4 GHz or AMD FX-9370 4.4 GHz,Memory:,8 GB RAM,Graphics:,GeForce GTX 660 2GB or AMD Radeon HD 7850 2GB (must support shader 5 model),DirectX:,Version 11,Network:,Broadband Internet connection,Storage:,2 GB available space,Additional Notes:,32bit OS versions is not supported",
    original_price: "$39.99",
    discount_price: null,
    is_favorite: null
  },
  // Add more hardcoded games here
  // Second game
  {
    ID: 3336,
    url: "https://store.steampowered.com/app/801880/Drift_Tuner_2019/",
    types: "app",
    name: "Drift Tuner 2019",
    desc_snippet: "Do you like Drifting? Are you a fan of JDM Style? You dream to fall sideways but you have not picked up a drift car yet? - This game is for you! The brand new drifting game from the S&COR Games.",
    recent_reviews: null,
    all_reviews: "Mixed,(127),- 53% of the 127 user reviews for this game are positive.",
    release_date: "Feb 1, 2018",
    developer: "S&COR Games",
    publisher: "S&COR Games,S&COR Games",
    popular_tags: "Racing,Simulation,Action,Massively Multiplayer,Open World",
    game_details: "Single-player,Multi-player,Online Multi-Player,Online Co-op,Partial Controller Support",
    languages: "English",
    achievements: null,
    genre: "Action,Massively Multiplayer,Racing,Simulation",
    game_description: "About This Game Do you like Drifting? Are you a fan of JDM Style? You dream to fall sideways but you have not picked up a drift car yet? - This game is for you! In this game, your dream will become a reality! Build a drift car, go to the track, improve your skills and get paid for it! Better skills -> Greater reward -> Better Drift Car!",
    mature_content: null,
    minimum_requirements: "Minimum:,OS:,Windows 7,Processor:,Intel Core i3,Memory:,2048 MB RAM,Graphics:,GTX560,DirectX:,Version 9.0,Storage:,2000 MB available space,Additional Notes:,Windows x64 bit only",
    recommended_requirements: "Recommended:,OS:,Windows 7,Processor:,Intel Core i5,Memory:,4096 MB RAM,Graphics:,GTX1060,DirectX:,Version 11,Storage:,2000 MB available space,Additional Notes:,Windows x64 bit",
    original_price: "$1.99",
    discount_price: null,
    is_favorite: null
  },
  // Third game
  {
    ID: 9556,
    url: "https://store.steampowered.com/app/635260/CarX_Drift_Racing_Online/",
    types: "app",
    name: "CarX Drift Racing Online",
    desc_snippet: "CarX Drift Racing Online is your chance to immerse yourself in the real world of drifting. Get together with friends, tune your car and burn some tires!",
    recent_reviews: "Mostly Positive,(74),- 78% of the 74 user reviews in the last 30 days are positive.",
    all_reviews: "Very Positive,(3,303),- 88% of the 3,303 user reviews for this game are positive.",
    release_date: "Nov 17, 2017",
    developer: "CarX Technologies",
    publisher: "CarX Technologies,CarX Technologies",
    popular_tags: "Racing,Driving,Sports,Simulation,Multiplayer,Massively Multiplayer,Arcade,Open World,Singleplayer,Early Access,Local Multiplayer",
    game_details: "Single-player,Multi-player,Online Multi-Player,Steam Achievements,Steam Trading Cards,Partial Controller Support",
    languages: "English,Russian",
    achievements: "36",
    genre: "Massively Multiplayer,Racing,Simulation,Sports",
    game_description: "About This Game CarX Drift Racing is a racing simulator dedicated to the motorsport of drifting. Legendary cars, detailed tuning settings and a real-time multiplayer mode in full HD at 60 fps. All this awaits you in the PC version of this popular mobile game!",
    mature_content: null,
    minimum_requirements: "Minimum:,OS:,Windows Vista SP2,Processor:,2.66 GHz Intel Core 2 Duo E6700 or 3.00 GHz AMD Athlon 64 X2 6000+,Memory:,4 GB RAM,Graphics:,512 MB (GeForce 8800 GT / Radeon HD 2900 PRO),DirectX:,Version 9.0c,Network:,Broadband Internet connection,Storage:,2 GB available space,Sound Card:,Sound card compatible with DirectX® 9.0?",
    recommended_requirements: "Recommended:,OS:,Windows 7, 8, 10,Processor:,Intel® Core™ i3-530 @ 2.93 GHz / AMD Phenom™ II X4 810 @ 2.60 GHz,Memory:,8 GB RAM,Graphics:,GeForce GTX 650 Ti 1 GB, Radeon HD 7770 1 GB,DirectX:,Version 9.0c,Network:,Broadband Internet connection,Storage:,2 GB available space,Sound Card:,Sound card compatible with DirectX® 9.0?",
    original_price: "$9.99",
    discount_price: "$33.98",
    is_favorite: null
  }
];
