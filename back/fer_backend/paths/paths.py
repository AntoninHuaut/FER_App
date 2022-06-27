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
        print("UPLOAD")
        print(request.files['file']) 
        res = {k:str(v) for k,v in enumerate(test_image(request.files['file']))}
        return jsonify(res)
    else : 
        print("UPLOAD ?")
        return jsonify("GET on UPLOAD")
    #print(request.form)
    #Get the image
    #Convert the image
    #Make the prediction test_image(picture)

