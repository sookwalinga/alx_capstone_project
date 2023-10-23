from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ufarm')
def details():
    return render_template('portfolio-details-ufarm.html')

@app.route('/friends')
def friends():
    return render_template('portfolio-details-friends.html')

@app.route('/green_mile')
def green_mile():
    return render_template('portfolio-details-green-mile.html')

@app.route('/mathquiz')
def mathquiz():
    return render_template('portfolio-details-mathquiz.html')

@app.route('/telewitnessing')
def telewitnessing():
    return render_template('portfolio-details-telewitnessing.html')

@app.route('/ministry_aide')
def ministry_aide():
    return render_template('portfolio-details-ministry-aide.html')

if __name__ == '__main__':
    app.run(debug=True)