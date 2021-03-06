from fer_backend import create_app
from flask_cors import CORS
app = create_app(debug=True)
CORS(app, resources={r"/api/v1": {"origins": "https://fer.antoninhuaut.fr/"}})

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
