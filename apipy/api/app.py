from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for
import json
import redis
from connectiondb import connect_db, get_list
app = Flask(__name__)

def connect_db():
    conexion = redis.StrictRedis(host='127.0.0.1', port=6379, db=0, decode_responses=True)
    if(conexion.ping()):
        print('conectado al servidor de redis')
    else:
        print('error..')
    return conexion

@app.route('/', methods=['GET', 'POST'])
def index():
    db = connect_db()
    db.set('dato', 2)
    db.set('Chapter 1: The Mandalorian', 'Disponible')
    db.set('Chapter 2: The Child', 'Reservado')
    db.set('Chapter 3: The Sin', 'Disponible')
    db.set('Chapter 4: Sanctuary', 'Alquilado')
    db.set('Chapter 5: The Gunslinger', 'Disponible')
    db.set('Chapter 6: The Prisoner', 'Disponible')
    db.set('Chapter 7: The Reckoning', 'Alquilado')
    db.set('Chapter 8: Redemption', 'Reservado')
    print('OK')
    if(request.method == 'GET'):
        lista = db.get('dato')
    return render_template('/index.html', datos = lista)





@app.route('/about')
def about():
    return"about python flask"

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)