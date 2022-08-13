from flask_cors import cross_origin
from flask import Blueprint, request, jsonify
from .ia_treatments import test_image
bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')


@bpapi.route("/")
def home():
    return jsonify({'status':'UP'})


@bpapi.route("/upload", methods=['POST', 'GET'])
@cross_origin()
def upload():
    if request.method == 'POST':
        prediction = test_image(request.files['file'])
        idToNames = get_idToNames()
        guessEmotion = prediction.index(max(prediction))
        arrayEmotion = [element.item() for element in prediction]
        res = {
            'idToNames': idToNames,
            'guessEmotion': guessEmotion,
            'arrayEmotion': arrayEmotion
        }

        return jsonify(res)


def get_idToNames():
    idToNames = {
        0: 'Furious',
        1: 'Irritated',
        2: 'Scared',
        3: 'Worried'
    }
    return idToNames