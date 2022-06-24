from flask import Blueprint, request, redirect, jsonify
from .ia_treatments import test_image
bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')
from flask_cors import cross_origin
@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/upload", methods=['GET','POST'])
@cross_origin()
def upload():
    print("Recieved")
    if request.method == 'POST':
        print(request.files['file']) 
        res = {k:str(v) for k,v in enumerate(test_image(request.files['file']))}
        response = jsonify(res)
        print(res)
        response.headers.add("Access-Control-Allow-Origin","http://localhost:3000")
        return response
    else : 
        response = jsonify("GET on UPLOAD")
        response.headers.add("Access-Control-Allow-Origin","http://localhost:3000")
        return response
    #print(request.form)
    #Get the image
    #Convert the image
    #Make the prediction test_image(picture)

