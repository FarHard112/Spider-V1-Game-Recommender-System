import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
import pickle

try:
    data = pd.read_csv('steam_games.csv')
    with open('vectorizer.pkl', 'rb') as file:
        vectorizer = pickle.load(file)
    with open('tfidf_matrix.pkl', 'rb') as file:
        tfidf_matrix = pickle.load(file)
    with open('knn_model.pkl', 'rb') as file:
        knn_model = pickle.load(file)
except FileNotFoundError:
    data = pd.read_csv('steam_games.csv')

    data['genre'] = data['genre'].fillna('')
    data['popular_tags'] = data['popular_tags'].fillna('')
    data['developer'] = data['developer'].fillna('')
    data['publisher'] = data['publisher'].fillna('')
    data['desc_snippet'] = data['desc_snippet'].fillna('')

    selected_features = ['genre', 'popular_tags', 'desc_snippet']
    data['combined_features'] = data[selected_features].astype(
        str).apply(lambda x: ' '.join(x), axis=1)

    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    tfidf_matrix = vectorizer.fit_transform(data['combined_features'])

    k = 5
    knn_model = NearestNeighbors(n_neighbors=k, metric='cosine')
    knn_model.fit(tfidf_matrix)

    # Save the precomputed objects
    with open('vectorizer.pkl', 'wb') as file:
        pickle.dump(vectorizer, file)
    with open('tfidf_matrix.pkl', 'wb') as file:
        pickle.dump(tfidf_matrix, file)
    with open('knn_model.pkl', 'wb') as file:
        pickle.dump(knn_model, file)


def get_recommendations(game_name, N):
    game_index = data[data['name'] == game_name].index[0]
    distances, indices = knn_model.kneighbors(
        tfidf_matrix[game_index], n_neighbors=N+1)
    top_games = [data.iloc[i] for i in indices.flatten()[1:]]
    recommendations = pd.DataFrame(top_games)
    return recommendations[['name']]


game_name = "DRAGON BALL FighterZ"
num_recommendations = 10

recommendations = get_recommendations(game_name, num_recommendations)

pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
pd.set_option('display.width', 1000)
pd.set_option('display.colheader_justify', 'left')
pd.set_option('display.expand_frame_repr', False)

print(recommendations)
print("Input from user :"+game_name)
