from flask import Flask, render_template, redirect, url_for, request, jsonify
import json

app = Flask(__name__)
players: int

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/player_input', methods= ['POST'])
def player_input():
    data = request.json
    
    with open('player_inputs.json', 'w') as outfile:
        json.dump(data, outfile)

    return {"response": "success"}
    

if __name__ == '__main__':
    app.run(debug=True)
