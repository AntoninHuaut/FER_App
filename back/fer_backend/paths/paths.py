from flask_cors import cross_origin
from flask import Blueprint, request, redirect, jsonify
from .ia_treatments import test_image
bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')


@bpapi.route("/")
def home():
    return "Accueil"


@bpapi.route("/upload", methods=['GET', 'POST'])
@cross_origin()
def upload():
    print("Recieved")
    if request.method == 'POST':
        print(request.files['file'])
        prediction = test_image(request.files['file'])
        idToNames = get_idToNames()
        guessEmotion = prediction.index(max(prediction))
        arrayEmotion = [element.item() for element in prediction]
        res = {
            'idToNames': idToNames,
            'guessEmotion': guessEmotion,
            'arrayEmotion': arrayEmotion
        }
        print(res)
        return jsonify(res)
    else:
        print("UPLOAD ?")
        return jsonify("GET on UPLOAD")
    # print(request.form)
    # Get the image
    # Convert the image
    # Make the prediction test_image(picture)


def get_idToNames():
    idToNames = {
        '0': 'Angry',
        '1': 'Disgust',
        '2': 'Fear',
        '3': 'Joy',
        '4': 'Sad',
        '5': 'Surprise'
    }
    return idToNames
