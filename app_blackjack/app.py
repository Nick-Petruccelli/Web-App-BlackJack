from flask import Flask, render_template, redirect, url_for, request, jsonify, Response
import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == "POST":
        user = request.form["name"]
        return redirect(url_for("enter_game", user= user))
    else:
        return render_template('index.html')

@app.route('/player_input', methods= ['POST'])
def player_input():
    data = request.json

    with open('data/player_inputs.json', 'w') as outfile:
        json.dump(data, outfile)

    return {"response": "success"}

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/<user>')
def enter_game(user):
    #add user to player json
    with open('data/players.json', 'r') as openfile:
        data = json.load(openfile)
    for player in data:
        if data[player] == '':
            data[player] = user
            break
    
    with open('data/players.json', 'w') as outfile:
        json.dump(data, outfile)
    return redirect(url_for("game"))

@app.route('/get_players', methods=['POST'])
def get_players():
    with open('data/players.json', 'r') as openfile:
        data = json.load(openfile)
    return data

@app.route('/stream_game_data')
def stream_game_data():
    def get_data():
        with open('data/previous_game_data.json', 'r') as openfile:
                previous_data = json.load(openfile)
        while True:
            try:
                with open('data/current_game_data.json', 'r') as openfile:
                    current_data = json.load(openfile)
            except:
                ...
            if previous_data["Version"] != current_data["Version"]:
                yield current_data
                with open('data/previous_game_data', 'w') as outfile:
                    json.dump(current_data, outfile)
    return Response(get_data(), mimetype='application/json')

            

if __name__ == '__main__':
    app.run(debug=True)
