import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameResponse , DataService} from '../services/data.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss'],
  standalone: true,
  imports: [CommonModule, GameCardComponent]
})
export class AllGamesComponent implements OnInit {
  public recommendedGames: GameResponse[] = []

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllGames();
    console.log(this.recommendedGames)
   }

  getAllGames() {
    this.recommendedGames = [
      {
        ID: 1,
        url: "https://store.steampowered.com/app/379720/DOOM/",
        types: "app",
        name: "DOOM",
        desc_snippet: "Now includes all three premium DLC packs (Unto the Evil, Hell Followed, and Bloodfall), maps, modes, and weapons, as well as all feature updates including Arcade Mode, Photo Mode, and the latest Update 6.66, which brings further multiplayer improvements as well as revamps multiplayer progression.",
        recent_reviews: "Very Positive,(554),- 89% of the 554 user reviews in the last 30 days are positive.",
        all_reviews: "Very Positive,(42,550),- 92% of the 42,550 user reviews for this game are positive.",
        release_date: "May 12, 2016",
        developer: "id Software",
        publisher: "Bethesda Softworks",
        popular_tags: "FPS, Gore, Action, Demons, Shooter, First-Person, Great Soundtrack, Multiplayer, Singleplayer, Fast-Paced, Sci-fi, Horror, Classic, Atmospheric, Difficult, Blood, Remake, Zombies, Co-op, Memes",
        game_details: "Single-player, Multi-player, Co-op, Steam Achievements, Steam Trading Cards, Partial Controller Support, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Japanese, Polish, Portuguese - Brazil, Russian, Traditional Chinese",
        achievements: "54",
        genre: "Action",
        game_description: "Developed by id software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience.",
        mature_content: "Includes intense violence and gore.",
        minimum_requirements: "Minimum:, OS:, Windows 7/8.1/10 (64-bit versions), Processor:, Intel Core i5-2400/AMD FX-8320 or better, Memory:, 8 GB RAM, Graphics:, NVIDIA GTX 670 2GB/AMD Radeon HD 7870 2GB or better, Storage:, 55 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 7/8.1/10 (64-bit versions), Processor:, Intel Core i7-3770/AMD FX-8350 or better, Memory:, 8 GB RAM, Graphics:, NVIDIA GTX 970 4GB/AMD Radeon R9 290 4GB or better, Storage:, 55 GB available space",
        original_price: "$19.99",
        discount_price: "$14.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/header.jpg?t=1692892793"
      },
      {
        ID: 2,
        url: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",
        types: "app",
        name: "The Witcher 3: Wild Hunt",
        desc_snippet: "The Witcher 3: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
        recent_reviews: "Overwhelmingly Positive,(2,000),- 98% of the 2,000 user reviews in the last 30 days are positive.",
        all_reviews: "Overwhelmingly Positive,(300,000),- 97% of the 300,000 user reviews for this game are positive.",
        release_date: "May 18, 2015",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        popular_tags: "Open World, RPG, Story Rich, Fantasy, Mature, Adventure, Singleplayer, Atmospheric, Choices Matter, Magic, Medieval, Action, Rich Story, Masterpiece",
        game_details: "Single-player, Steam Achievements, Full controller support, Steam Trading Cards, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Polish, Czech, Russian, Hungarian, Portuguese - Brazil, Chinese, Japanese, Korean",
        achievements: "78",
        genre: "RPG",
        game_description: "In The Witcher 3, you play as Geralt of Rivia, a monster hunter searching for his missing adopted daughter on the run from the Wild Hunt, an otherworldly force determined to capture her and bring about the end of the world.",
        mature_content: "The game contains Blood and Gore, Intense Violence, Nudity, Strong Language, Strong Sexual Content, Use of Alcohol.",
        minimum_requirements: "Minimum:, OS:, 64-bit Windows 7, 8 (8.1) or 10, Processor:, Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940, Memory:, 6 GB RAM, Graphics:, Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870, Storage:, 35 GB available space",
        recommended_requirements: "Recommended:, OS:, 64-bit Windows 7, 8 (8.1) or 10, Processor:, Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz, Memory:, 8 GB RAM, Graphics:, Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290, Storage:, 35 GB available space",
        original_price: "$39.99",
        discount_price: "$29.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg?t=1589887951"
      },
      {
        ID: 3,
        url: "https://store.steampowered.com/app/1085660/Destiny_2/",
        types: "app",
        name: "Destiny 2",
        desc_snippet: "Dive into the world of Destiny 2 to explore the mysteries of the solar system and experience responsive first-person shooter combat.",
        recent_reviews: "Mostly Positive,(1,200),- 76% of the 1,200 user reviews in the last 30 days are positive.",
        all_reviews: "Very Positive,(200,000),- 85% of the 200,000 user reviews for this game are positive.",
        release_date: "October 1, 2019",
        developer: "Bungie",
        publisher: "Bungie",
        popular_tags: "Free to Play, Looter Shooter, FPS, Multiplayer, Open World, Sci-Fi, Shooter, Action, Co-op, PvP, PvE, Space, First-Person, MMO, Great Soundtrack, Adventure",
        game_details: "Single-player, Multi-player, Online Co-op, Steam Achievements, Full controller support, Steam Trading Cards, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Polish, Russian, Portuguese - Brazil, Japanese, Korean, Simplified Chinese, Traditional Chinese",
        achievements: "23",
        genre: "Action, Shooter",
        game_description: "Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.",
        mature_content: "The game contains Violence, Blood, Language.",
        minimum_requirements: "Minimum:, OS:, Windows 7 / 8.1 / 10, 64-bit, Processor:, Intel i3-3250 3.5 GHz / AMD FX-4350 4.2 GHz, Memory:, 6 GB RAM, Graphics:, Nvidia GTX 660 2GB / AMD Radeon HD 7850 2GB, Storage:, 105 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 7 / 8.1 / 10, 64-bit, Processor:, Intel i5-2400 3.4 GHz / AMD Ryzen R5 1600X 3.6 GHz, Memory:, 8 GB RAM, Graphics:, Nvidia GTX 970 4GB / AMD R9 390 8GB, Storage:, 105 GB available space",
        original_price: "Free",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/header.jpg?t=1604918478",
        discount_price:null
      },{
        ID: 4,
        url: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
        types: "app",
        name: "Grand Theft Auto V",
        desc_snippet: "Explore the stunning world of Los Santos and Blaine County in the ultimate Grand Theft Auto V experience, featuring a range of technical upgrades and enhancements for new and returning players.",
        recent_reviews: "Mostly Positive,(3,000),- 78% of the 3,000 user reviews in the last 30 days are positive.",
        all_reviews: "Overwhelmingly Positive,(800,000),- 96% of the 800,000 user reviews for this game are positive.",
        release_date: "April 14, 2015",
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        popular_tags: "Open World, Action, Multiplayer, Third-Person Shooter, Crime, Adventure, Singleplayer, Sandbox, Atmospheric, Story Rich, Mature, Comedy, First-Person, Moddable, Classic",
        game_details: "Single-player, Multi-player, Online Multi-player, Steam Achievements, Full controller support, Steam Trading Cards",
        languages: "English, French, Italian, German, Spanish - Spain, Korean, Polish, Portuguese - Brazil, Russian, Traditional Chinese, Japanese",
        achievements: "77",
        genre: "Action, Adventure",
        game_description: "Grand Theft Auto V blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game's three lead characters, playing all sides of the game's interwoven story.",
        mature_content: "Contains intense violence, blood and gore, sexual content, and/or strong language.",
        minimum_requirements: "Minimum:, OS:, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Processor:, Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHz, Memory:, 4 GB RAM, Graphics:, NVIDIA 9800 GT 1GB / AMD HD 4870 1GB, Storage:, 72 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 10 64 Bit, Processor:, Intel Core i5 3470 @ 3.2GHZ (4 CPUs) / AMD X8 FX-8350 @ 4GHZ (8 CPUs), Memory:, 8 GB RAM, Graphics:, NVIDIA GTX 660 2GB / AMD HD 7870 2GB, Storage:, 72 GB available space",
        original_price: "$29.99",
        discount_price: "$14.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg?t=1592866698"
      },
      {
        ID: 5,
        url: "https://store.steampowered.com/app/582010/Monster_Hunter_World/",
        types: "app",
        name: "Monster Hunter: World",
        desc_snippet: "Take on ferocious beasts in a living, breathing ecosystem where you can use the landscape and its diverse inhabitants to get the upper hand.",
        recent_reviews: "Mostly Positive,(1,500),- 84% of the 1,500 user reviews in the last 30 days are positive.",
        all_reviews: "Very Positive,(150,000),- 86% of the 150,000 user reviews for this game are positive.",
        release_date: "August 9, 2018",
        developer: "Capcom",
        publisher: "Capcom",
        popular_tags: "Open World, Co-op, Action, RPG, Adventure, Multiplayer, Hunting, Fantasy, Singleplayer, Third-Person, Atmospheric, Difficult, Realistic, Action RPG, Beautiful",
        game_details: "Single-player, Multi-player, Online Co-op, Steam Achievements, Full controller support, Steam Trading Cards",
        languages: "English, French, Italian, German, Spanish - Spain, Polish, Portuguese - Brazil, Russian, Japanese, Korean, Chinese",
        achievements: "50",
        genre: "Action, RPG",
        game_description: "Monster Hunter: World sees players gear up to venture on quests to battle against fearsome monsters, progressively improving their hunting abilities as they play.",
        mature_content: "This game includes Blood, Mild Language, Use of Alcohol, Violence.",
        minimum_requirements: "Minimum:, OS:, Windows 7, 8, 8.1, 10 (64-bit required), Processor:, Intel Core i5-4460, 3.20GHz or AMD FX-6300, Memory:, 8 GB RAM, Graphics:, NVIDIA GeForce GTX 760 or AMD Radeon R7 260x (VRAM 2GB), Storage:, 48 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 7, 8, 8.1, 10 (64-bit required), Processor:, Intel Core i7 3770 3.4 GHz or Intel Core i3 8350 4 GHz or AMD Ryzen 5 1500X, Memory:, 8 GB RAM, Graphics:, NVIDIA GeForce GTX 1060 (VRAM 3GB) or AMD Radeon RX 570X (VRAM 4GB), Storage:, 48 GB available space",
        original_price: "$29.99",
        discount_price: "$19.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582010/header.jpg?t=1584032458"
      },
      {
        ID: 6,
        url: "https://store.steampowered.com/app/374320/Dark_Souls_III/",
        types: "app",
        name: "Dark Souls III",
        desc_snippet: "As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments. Players will be immersed in a world of epic atmosphere and darkness through faster gameplay and amplified combat intensity.",
        recent_reviews: "Very Positive,(800),- 90% of the 800 user reviews in the last 30 days are positive.",
        all_reviews: "Very Positive,(100,000),- 93% of the 100,000 user reviews for this game are positive.",
        release_date: "April 12, 2016",
        developer: "FromSoftware, Inc.",
        publisher: "BANDAI NAMCO Entertainment",
        popular_tags: "Dark Fantasy, Action, Difficult, RPG, Atmospheric, Singleplayer, Souls-like, Adventure, Third-Person, Open World, Story Rich, Great Soundtrack, Fantasy, Hardcore, Action RPG",
        game_details: "Single-player, Steam Achievements, Full controller support, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Japanese, Korean, Polish, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese",
        achievements: "43",
        genre: "Action, RPG",
        game_description: "Players are equipped with a variety of weapons to fight against enemies, which along with strategic gameplay, spell casting, and immersive storytelling, makes up a challenging experience.",
        mature_content: "Game contains violence and blood.",
        minimum_requirements: "Minimum:, OS:, Windows 7 SP1 64bit, Windows 8.1 64bit Windows 10 64bit, Processor:, Intel Core i3-2100 / AMD® FX-6300, Memory:, 4 GB RAM, Graphics:, NVIDIA® GeForce GTX 750 Ti / ATI Radeon HD 7950, Storage:, 25 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 7 SP1 64bit, Windows 8.1 64bit Windows 10 64bit, Processor:, Intel Core i7-3770 / AMD® FX-8350, Memory:, 8 GB RAM, Graphics:, NVIDIA® GeForce GTX 970 / AMD Radeon R9 series, Storage:, 25 GB available space",
        original_price: "$59.99",
        discount_price: "$39.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg?t=1587410039"
      },
      {
        ID: 7,
        url: "https://store.steampowered.com/app/620980/Beat_Saber/",
        types: "app",
        name: "Beat Saber",
        game_description:"no desc",
        desc_snippet: "Experience the thrill of slashing through beats in VR with Beat Saber, an immersive rhythm game where your actions are driven by the music.",
        recent_reviews: "Overwhelmingly Positive,(1,000),- 95% of the 1,000 user reviews in the last 30 days are positive.",
        all_reviews: "Overwhelmingly Positive,(200,000),- 98% of the 200,000 user reviews for this game are positive.",
        release_date: "May 1, 2018",
        developer: "Beat Games",
        publisher: "Beat Games",
        popular_tags: "VR, Rhythm, Music, Great Soundtrack, Singleplayer, Action, Indie, Colorful, Fast-Paced, Difficult, Arcade, Casual, Family Friendly, Sports, Fitness",
        game_details: "Single-player, Steam Achievements, Full VR Support, Steam Trading Cards, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Japanese, Korean, Simplified Chinese, Traditional Chinese",
        achievements: "26",
      
      },
      {
        ID: 8,
        url: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",
        types: "app",
        name: "The Witcher 3: Wild Hunt",
        desc_snippet: "Become Geralt of Rivia, a monster hunter struggling to find his place in a world where people often prove more wicked than beasts.",
        recent_reviews: "Overwhelmingly Positive,(3,200),- 96% of the 3,200 user reviews in the last 30 days are positive.",
        all_reviews: "Overwhelmingly Positive,(500,000),- 98% of the 500,000 user reviews for this game are positive.",
        release_date: "May 18, 2015",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        popular_tags: "Open World, RPG, Story Rich, Fantasy, Atmospheric, Singleplayer, Adventure, Action, Mature, Magic, Dark Fantasy, Medieval, Great Soundtrack, Choices Matter, Third Person",
        game_details: "Single-player, Steam Achievements, Full controller support, Steam Trading Cards, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Arabic, Czech, Hungarian, Japanese, Korean, Polish, Portuguese - Brazil, Russian, Traditional Chinese, Turkish",
        achievements: "78",
        genre: "RPG",
        game_description: "The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
        mature_content: "Game contains nudity, strong language, and intense violence.",
        minimum_requirements: "Minimum:, OS:, Windows 7/8.1/10 (64-bit versions), Processor:, Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940, Memory:, 6 GB RAM, Graphics:, Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870, Storage:, 35 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 7/8.1/10 (64-bit versions), Processor:, Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz, Memory:, 8 GB RAM, Graphics:, Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290, Storage:, 35 GB available space",
        original_price: "$39.99",
        discount_price: "$19.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg?t=1602502082"
      },
      {
        ID: 9,
        url: "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/",
        types: "app",
        name: "Counter-Strike: Global Offensive",
        desc_snippet: "CS:GO continues the Counter-Strike series' trophy-laden heritage by being a balanced, skill-based game that rewards quick reflexes and tactical prowess.",
        recent_reviews: "Very Positive,(20,000),- 85% of the 20,000 user reviews in the last 30 days are positive.",
        all_reviews: "Very Positive,(4,000,000),- 87% of the 4,000,000 user reviews for this game are positive.",
        release_date: "August 21, 2012",
        developer: "Valve, Hidden Path Entertainment",
        publisher: "Valve",
        popular_tags: "FPS, Shooter, Multiplayer, Competitive, Action, Team-Based, Tactical, First-Person, eSports, PvP, Military, Strategy, Co-op, Online Co-Op, Fast-Paced",
        game_details: "Multi-player, Online Multi-player, Local Multi-player, Steam Achievements, Full controller support, Steam Trading Cards, Steam Workshop, SteamVR Collectibles, Valve Anti-Cheat enabled",
        languages: "English, Czech, Danish, Dutch, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Portuguese - Brazil, Russian, Simplified Chinese, Spanish - Spain, Swedish, Traditional Chinese, Thai, Turkish, Ukrainian, Bulgarian, Romanian",
        achievements: "167",
        genre: "Action",
        game_description: "Counter-Strike: Global Offensive expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.",
        mature_content: "Game contains intense violence and blood.",
        minimum_requirements: "Minimum:, OS:, Windows 7/Vista/XP, Processor:, Intel Core 2 Duo E6600 or AMD Phenom X3 8750 processor or better, Memory:, 2 GB RAM, Graphics:, Video card must be 256 MB or more and should be a DirectX 9-compatible with support for Pixel Shader 3.0, Storage:, 15 GB available space",
        recommended_requirements: "No additional system requirements listed.",
        original_price: "Free to Play",
        discount_price: null,
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1602526403"
      },
      {
        ID: 10,
        url: "https://store.steampowered.com/app/367520/Hollow_Knight/",
        types: "app",
        name: "Hollow Knight",
        desc_snippet: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.",
        recent_reviews: "Overwhelmingly Positive,(1,000),- 96% of the 1,000 user reviews in the last 30 days are positive.",
        all_reviews: "Overwhelmingly Positive,(100,000),- 95% of the 100,000 user reviews for this game are positive.",
        release_date: "February 24, 2017",
        developer: "Team Cherry",
        publisher: "Team Cherry",
        popular_tags: "Metroidvania, Platformer, Adventure, Indie, Action, Singleplayer, Atmospheric, Great Soundtrack, Difficult, Exploration, Dark, Fantasy, 2D, Story Rich, Side Scroller",
        game_details: "Single-player, Steam Achievements, Full controller support, Steam Trading Cards, Steam Cloud",
        languages: "English, French, Italian, German, Spanish - Spain, Korean, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese",
        achievements: "63",
        genre: "Action, Adventure, Indie",
        game_description: "Hollow Knight is a challenging, beautifully hand-crafted action-adventure game in the vein of classic 2D platformers. Explore a surreal, sprawling, interconnected world and uncover new powers, hidden secrets, and an array of quirky characters.",
        mature_content: "Game contains fantasy violence.",
        minimum_requirements: "Minimum:, OS:, Windows 7, Processor:, Intel Core 2 Duo E5200, Memory:, 4 GB RAM, Graphics:, GeForce 9800GTX+ (1GB), Storage:, 9 GB available space",
        recommended_requirements: "Recommended:, OS:, Windows 10, Processor:, Intel Core i5, Memory:, 8 GB RAM, Graphics:, GeForce GTX 560, Storage:, 9 GB available space",
        original_price: "$14.99",
        discount_price: "$9.99",
        imgUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1581035019"
      }
      ];
  
    
  }
}