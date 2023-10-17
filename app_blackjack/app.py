from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
players: int

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/hit', methods= ['POST'])
def hit():
    

if __name__ == '__main__':
    app.run(debug=True)
