
# Spider Game Recommender

An AI-powered game recommendation system that leverages collaborative filtering and K-Nearest Neighbors (KNN) to provide personalized game suggestions based on user behavior and preferences.

## Overview

The Spider Game Recommender is a comprehensive solution that combines:

-   A Flask API serving AI models for game recommendations
-   A C# backend API for handling user interactions and data management
-   An Angular frontend for a seamless user experience

  ![image](https://github.com/user-attachments/assets/a7cf4093-2e48-490c-8c42-16d3b9849923)


## Features

-   Personalized game recommendations using collaborative filtering and content-based methods
-   Real-time API for dynamic suggestions
-   Integration with Steam for game images
-   User profile management and favorite game tracking
-   Dockerized deployment for easy scaling and consistency

## Technical Stack

-   **AI/ML**: Python, scikit-learn, pandas
-   **Backend**: Flask (Python), ASP.NET Core (C#)
-   **Frontend**: Angular
-   **Deployment**: Docker, Contabo Linux Ubuntu server

## Key Components

1.  **Data Processing Pipeline**
    -   Data ingestion from multiple sources
    -   Feature extraction using TF-IDF vectorization
    -   KNN model training for content-based filtering
2.  **Recommendation Engine**
    -   Collaborative filtering for user-based recommendations
    -   Content-based filtering using game features
3.  **APIs**
    -   Flask API for serving ML models
    -   C# API for user management and application logic
4.  **Web Application**
    -   Angular-based frontend for user interactions
    -   Display of game recommendations with images

## Deployment

The system is deployed on a Contabo Linux Ubuntu server using Docker containers for both the Flask and C# APIs.
![WhatsApp Image 2024-06-13 at 10 36 06 PM](https://github.com/user-attachments/assets/7369d2ab-2d65-4cb2-a89e-5b8f22937fc2)

## API Documentation

API documentation is available through Swagger UI. Key endpoints include:

-   `GET /api/Home/recommendations`: Fetch game recommendations
-   `PUT /api/Home/update-favorite/{id}`: Update user's favorite games
-   `POST /api/Home/get-collaborative-filter-recommends`: Get recommendations using collaborative filtering

## Future Improvements

-   Implement model retraining capabilities
-   Enhance error handling and input validation
-   Implement logging for performance monitoring
-   Explore more complex models or ensemble methods for improved accuracy
