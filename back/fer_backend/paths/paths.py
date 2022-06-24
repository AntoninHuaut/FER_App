from flask import Blueprint, request, redirect, jsonify
from .ia_treatments import test_image

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')

@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/upload")
def upload():
    #Get the image
    #Convert the image
    #Make the prediction test_image(picture)
    return "TODO : GET PICTURE"
