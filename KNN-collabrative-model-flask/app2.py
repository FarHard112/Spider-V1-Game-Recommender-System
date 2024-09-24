from flask import Flask, request, jsonify
import pickle
import operator

app = Flask(__name__)

# Load the saved DataFrames
with open('pv_dataframe.pkl', 'rb') as f:
    pv = pickle.load(f)

with open('df_user_dataframe.pkl', 'rb') as f:
    df_user = pickle.load(f)


def simi_user_recs(user):
    if user not in pv.columns:
        return f'No data available for this user {user}'

    sim_user = df_user.sort_values(by=user, ascending=False).index[1:11]
    best = []
    most_common = {}

    for i in sim_user:
        max_score = pv.loc[:, i].max()
        best.append(pv[pv.loc[:, i] == max_score].index.tolist())

    for i in range(len(best)):
        for j in best[i]:
            if j in most_common:
                most_common[j] += 1
            else:
                most_common[j] = 1

    sorted_item = sorted(most_common.items(),
                         key=operator.itemgetter(1), reverse=True)
    return sorted_item[:6]


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    recommendations = simi_user_recs(user_id)

    if isinstance(recommendations, str):
        return jsonify({'error': recommendations}), 404

    return jsonify({'recommendations': recommendations})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5959)
