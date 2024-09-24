from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle

app = Flask(__name__)


with open('vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)
with open('tfidf_matrix.pkl', 'rb') as file:
    tfidf_matrix = pickle.load(file)
with open('knn_model.pkl', 'rb') as file:
    knn_model = pickle.load(file)
data = pd.read_csv('steam_games.csv')


def get_recommendations(game_name, N):
    game_index = data[data['name'] == game_name].index[0]
    distances, indices = knn_model.kneighbors(
        tfidf_matrix[game_index], n_neighbors=N+1)
    top_games = [data.iloc[i] for i in indices.flatten()[1:]]
    recommendations = pd.DataFrame(top_games)
    return recommendations[['name']]


@app.route('/recommend', methods=['GET'])
def recommend_games():
    game_name = request.args.get('game_name')
    num_recommendations = int(request.args.get('num_recommendations', 10))

    try:
        recommendations = get_recommendations(game_name, num_recommendations)
        return jsonify(recommendations.to_dict(orient='records'))
    except IndexError:
        return jsonify({'error': 'Game not found in the dataset.'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5858)
