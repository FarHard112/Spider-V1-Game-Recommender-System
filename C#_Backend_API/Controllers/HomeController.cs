using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;

namespace SpiderBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _connectionString = "Your Connection string ";

        public HomeController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();

        }
        private async Task<int> GetOrSetUserIdAsync()
        {
            if (!HttpContext.Session.TryGetValue("user_id", out var userId))
            {
                int newUserId;

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    await conn.OpenAsync();

                    // Retrieve a random user_id from the GameUserBehavior table
                    string query = "SELECT TOP 1 user_id FROM [Spider_SteamCollection].[dbo].[GameUserBehavior] ORDER BY NEWID()";
                    SqlCommand cmd = new SqlCommand(query, conn);

                    var result = await cmd.ExecuteScalarAsync();
                    newUserId = Convert.ToInt32(result);

                    HttpContext.Session.SetInt32("user_id", newUserId);
                }

                return newUserId;
            }
            else
            {
                return HttpContext.Session.GetInt32("user_id").Value;
            }
        }

        [HttpGet("getUserId")]
        public async Task<IActionResult> GetUserId()
        {
            return Ok(await GetOrSetUserIdAsync());
        }

        [HttpGet("recommendations")]
        public async Task<IActionResult> GetRecommendations(string gameName, int numRecommendations = 10)
        {
            try
            {
                string apiUrl = $"http://your_flask_url_knn:5858/recommend?game_name={Uri.EscapeDataString(gameName)}&num_recommendations={numRecommendations}";

                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    JArray recommendationsArray = JArray.Parse(jsonResponse);

                    List<string> recommendations = new List<string>();
                    foreach (JObject recommendation in recommendationsArray)
                    {  
                        string name = recommendation["name"].ToString();
                        recommendations.Add(name);
                    }

                    return Ok(recommendations);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return NotFound("Game not found in the dataset.");
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "An error occurred while retrieving recommendations.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("get-gamedata")]
        public async Task<IActionResult> GetGameData()
        {
            try
            {
                var gameDataList = new List<Dictionary<string, object>>();

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    string query = "SELECT TOP 10 [ID], [url], [types], [name], [desc_snippet], [recent_reviews], [all_reviews], " +
                                   "[release_date], [developer], [publisher], [popular_tags], [game_details], [languages], " +
                                   "[achievements], [genre], [game_description], [mature_content], [minimum_requirements], " +
                                   "[recommended_requirements], [original_price], [discount_price], [is_favorite] " +
                                   "FROM [Spider_SteamCollection].[dbo].[GameData]";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();

                    while (await reader.ReadAsync())
                    {
                        var gameData = new Dictionary<string, object>();

                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            gameData[reader.GetName(i)] = reader.IsDBNull(i) ? null : reader.GetValue(i);
                        }

                        gameDataList.Add(gameData);
                    }

                    reader.Close();
                }

                return Ok(gameDataList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("update-favorite/{id}")]
        public async Task<IActionResult> UpdateFavorite(int id, [FromBody] bool isFavorite)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    string query = "UPDATE [Spider_SteamCollection].[dbo].[GameData] " +
                                   "SET [is_favorite] = @IsFavorite " +
                                   "WHERE [ID] = @ID";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@IsFavorite", isFavorite);
                    cmd.Parameters.AddWithValue("@ID", id);

                    conn.Open();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { message = "Update successful" });
                    }
                    else
                    {
                        return NotFound(new { message = "Game not found" });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("get-favorited-and-recommended")]
        public async Task<IActionResult> GetFavoritedAndRecommended([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var gameDataList = new List<Dictionary<string, object>>();
                var recommendedGamesSet = new HashSet<string>();
                int offset = (page - 1) * pageSize;

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    // Step 1: Initialize the queue with all favorited games that haven't been used for recommendations
                    string favoriteQuery = @"
                SELECT [name] 
                FROM [Spider_SteamCollection].[dbo].[GameData] g
                WHERE g.is_favorite = 1
                AND NOT EXISTS (
                    SELECT 1 
                    FROM [Spider_SteamCollection].[dbo].[RecommendationHistory] r
                    WHERE r.GameName = g.name
                )";

                    SqlCommand favoriteCmd = new SqlCommand(favoriteQuery, conn);
                    var favoriteGamesQueue = new Queue<string>();

                    SqlDataReader favoriteReader = await favoriteCmd.ExecuteReaderAsync();
                    while (await favoriteReader.ReadAsync())
                    {
                        string favoriteGameName = favoriteReader.GetString(0);
                        favoriteGamesQueue.Enqueue(favoriteGameName);
                    }
                    favoriteReader.Close();

                    // Step 2: Process the queue
                    while (favoriteGamesQueue.Count > 0 && gameDataList.Count < pageSize)
                    {
                        string currentFavoriteGame = favoriteGamesQueue.Dequeue();

                        // Step 3: Get recommended games from the recommendation system for the current favorite game
                        HttpResponseMessage response = await _httpClient.GetAsync($"http://your_flask_url_knn:5858/recommend?game_name={Uri.EscapeDataString(currentFavoriteGame)}&num_recommendations={pageSize}");
                        if (response.IsSuccessStatusCode)
                        {
                            string jsonResponse = await response.Content.ReadAsStringAsync();
                            JArray recommendationsArray = JArray.Parse(jsonResponse);

                            foreach (JObject recommendation in recommendationsArray)
                            {
                                string recommendedName = recommendation["name"].ToString();

                                // Avoid duplicates by checking if the game is already recommended
                                if (recommendedGamesSet.Contains(recommendedName))
                                {
                                    continue;
                                }

                                recommendedGamesSet.Add(recommendedName);

                                // Step 4: Fetch the game details from the database
                                string gameQuery = "SELECT TOP 1 * FROM [Spider_SteamCollection].[dbo].[GameData] WHERE name = @Name";
                                SqlCommand gameCmd = new SqlCommand(gameQuery, conn);
                                gameCmd.Parameters.AddWithValue("@Name", recommendedName);

                                SqlDataReader gameReader = await gameCmd.ExecuteReaderAsync();
                                while (await gameReader.ReadAsync())
                                {
                                    var gameData = new Dictionary<string, object>();
                                    for (int i = 0; i < gameReader.FieldCount; i++)
                                    {
                                        gameData[gameReader.GetName(i)] = gameReader.IsDBNull(i) ? null : gameReader.GetValue(i);
                                    }
                                    gameDataList.Add(gameData);
                                }
                                gameReader.Close();

                                if (gameDataList.Count >= pageSize) break;
                            }

                            // Step 5: Save the current favorite game to the RecommendationHistory table
                            string insertHistoryQuery = "INSERT INTO [Spider_SteamCollection].[dbo].[RecommendationHistory] (GameName) VALUES (@GameName)";
                            SqlCommand insertHistoryCmd = new SqlCommand(insertHistoryQuery, conn);
                            insertHistoryCmd.Parameters.AddWithValue("@GameName", currentFavoriteGame);
                            await insertHistoryCmd.ExecuteNonQueryAsync();
                        }
                    }

                    // Step 6: If no more favorites or not enough recommendations, fetch random games
                    if (gameDataList.Count < pageSize)
                    {
                        string randomQuery = "SELECT TOP (@Remaining) * FROM [Spider_SteamCollection].[dbo].[GameData] ORDER BY NEWID()";
                        SqlCommand randomCmd = new SqlCommand(randomQuery, conn);
                        randomCmd.Parameters.AddWithValue("@Remaining", pageSize - gameDataList.Count);

                        SqlDataReader randomReader = await randomCmd.ExecuteReaderAsync();
                        while (await randomReader.ReadAsync())
                        {
                            var gameData = new Dictionary<string, object>();
                            for (int i = 0; i < randomReader.FieldCount; i++)
                            {
                                gameData[randomReader.GetName(i)] = randomReader.IsDBNull(i) ? null : randomReader.GetValue(i);
                            }
                            gameDataList.Add(gameData);
                        }
                        randomReader.Close();
                    }
                }

                return Ok(gameDataList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPost("get-collaborative-filter-recommends")]
        public async Task<IActionResult> GetCollaborativeFilterRecommends([FromBody] CollaborativeFilterRequest request)
        {
            try
            {
                // Extract the user_id from the request
                string userId = request.UserId;

                // Call the collaborative filtering recommendation API
                string apiUrl = $"http://your_flask_url_collabrative_filtering:5959/recommend";
                var postData = new { user_id = userId };

                var content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(postData), System.Text.Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    JObject responseObject = JObject.Parse(jsonResponse);

                    // Extract the list of game names
                    var gameNames = responseObject["recommendations"]
                        .Select(r => r[0].ToString())
                        .ToList();

                    // Fetch game details from the database based on the recommended game names
                    var recommendedGameDetails = new List<Dictionary<string, object>>();
                    using (SqlConnection conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();

                        // Build the SQL query with an IN clause
                        string gameQuery = $"SELECT * FROM [Spider_SteamCollection].[dbo].[GameData] WHERE name IN ({string.Join(",", gameNames.Select(n => $"'{n.Replace("'", "''")}'"))})";
                        SqlCommand gameCmd = new SqlCommand(gameQuery, conn);

                        SqlDataReader gameReader = await gameCmd.ExecuteReaderAsync();
                        while (await gameReader.ReadAsync())
                        {
                            var gameData = new Dictionary<string, object>();
                            for (int i = 0; i < gameReader.FieldCount; i++)
                            {
                                gameData[gameReader.GetName(i)] = gameReader.IsDBNull(i) ? null : gameReader.GetValue(i);
                            }
                            recommendedGameDetails.Add(gameData);
                        }
                        gameReader.Close();
                    }

                    return Ok(recommendedGameDetails);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "An error occurred while retrieving collaborative filter recommendations.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }





        public class CollaborativeFilterRequest
        {
            public string UserId { get; set; }
        }

    }
}